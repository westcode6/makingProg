<script lang="ts">
	// @ts-nocheck

	/**
	 * @props
	 * onSuccess: (res) => void //required
	 * onRevert: () => void //required
	 * onError: () => void //optional
	 * allowMultiple: boolean; //optional
	 * folder: string; //required
	 * acceptedFiles: string; //required
	 * maxFileSize: string; //optional
	 * maxTotalFileSize: string; //optional
	 * required: boolean // optional
	 */

	import FilePond, { registerPlugin } from 'svelte-filepond';
	import 'filepond/dist/filepond.css';
	import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
	import { PUBLIC_IMAGEKIT_PUBLIC_KEY } from '$env/static/public';

	// Import the Image EXIF Orientation and Image Preview plugins
	// Note: These need to be installed separately
	// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
	import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

	// Props:
	export let onSuccess: (res: {
		fileId: string;
		name: string;
		size: number;
		versionInfo: { id: string; name: string };
		filePath: string;
		url: string;
		fileType: string;
		height: number;
		width: number;
		orientation: number;
		thumbnailUrl: string;
		AITags: string | null;
	}) => void;
	export let onRevert: () => void;
	export let onError: () => void = () => console.log('upload error');
	export let allowMultiple: boolean = false;
	export let folder;
	export let acceptedFileTypes: 'image/*' | 'audio/*' | 'video/*';
	export let maxFileSize = '10mb';
	export let maxTotalFileSize = null;
	export let required = false;

	// Register the plugins
	registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
	registerPlugin(FilePondPluginFileValidateType);
	registerPlugin(FilePondPluginFileValidateSize);

	// a reference to the component, used to call FilePond methods
	let pond;

	// pond.getFiles() will return the active files

	// handle filepond events
	function handleInit() {}

	let ikAuthParams = { token: null, signature: null, expire: null };

	async function handleAddFile(err, fileItem) {
		try {
			const res = await fetch('/api/imagekit', {
				headers: {
					_xat: PUBLIC_IMAGEKIT_PUBLIC_KEY.replace('public_', 'xat')
				}
			});
			const data = await res.json();

			ikAuthParams.token = data.token;
			ikAuthParams.signature = data.signature;
			ikAuthParams.expire = data.expire;
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div>
	<FilePond
		bind:this={pond}
		name="file"
		server={{
			process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
				// fieldName is the name of the input field
				// file is the actual file object to send
				const { signature, expire, token } = ikAuthParams;

				const formData = new FormData();

				formData.append('file', file);
				formData.append('publicKey', PUBLIC_IMAGEKIT_PUBLIC_KEY);
				formData.append('signature', signature);
				formData.append('expire', expire);
				formData.append('token', token);
				formData.append('folder', folder);
				formData.append('fileName', crypto.randomUUID());

				const request = new XMLHttpRequest();
				request.open('POST', 'https://upload.imagekit.io/api/v1/files/upload');

				// Should call the progress method to update the progress to 100% before calling load
				// Setting computable to false switches the loading indicator to infinite mode
				request.upload.onprogress = (e) => {
					progress(e.lengthComputable, e.loaded, e.total);
				};

				// Should call the load method when done and pass the returned server file id
				// this server file id is then used later on when reverting or restoring a file
				// so your server knows which file to return without exposing that info to the client
				request.onload = function () {
					if (request.status >= 200 && request.status < 300) {
						// the load method accepts either a string (id) or an object

						onSuccess(JSON.parse(request.response));
						load(request.response);
					} else {
						// Can call the error method if something is wrong, should exit after
						onError();
						error('oh no');
					}
				};

				request.send(formData);

				// Should expose an abort method so the request can be cancelled
				return {
					abort: () => {
						// This function is entered if the user has tapped the cancel button
						request.abort();

						// Let FilePond know the request has been cancelled
						abort();
					}
				};
			},
			revert: async (uniqueFileId, load, error) => {
				const payload = JSON.parse(uniqueFileId);

				const res = await fetch('/api/imagekit?fileId=' + payload.fileId, {
					method: 'DELETE',
					headers: {
						_xat: PUBLIC_IMAGEKIT_PUBLIC_KEY.replace('public_', 'xat')
					}
				});
				const data = await res.json();

				// Can call the error method if something is wrong, should exit after
				onRevert();
				error('Error');

				// Should call the load method when done, no parameters required
				load();
			}
		}}
		credits={false}
		{allowMultiple}
		allowReorder={true}
		instantUpload={true}
		oninit={handleInit}
		onaddfile={handleAddFile}
		dropValidation={true}
		acceptedFileTypes={[acceptedFileTypes]}
		{maxFileSize}
		{maxTotalFileSize}
		{required}
	/>
</div>
