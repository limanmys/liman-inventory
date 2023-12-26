@include('file-input', [
    'callback' => 'fileUploadSuccess'
])

<script>
    var fileUploadCallback = null;
    function startUploadCallback(callback){
        fileUploadCallback = callback;
    }
    function fileUploadSuccess(upload){
        let data = new FormData();
        data.append('file', upload.info.file_path);
        data.append('label', "{{ $label }}")
        request("{{API("upload")}}", data, function(response){
            let success = JSON.parse(response);
            window.$notification.success({
                title: "Başarılı",
                content: "Paket başarıyla yüklendi.",
            })
            setTimeout(() => {
                window.location.reload();
            }, 2500)
        }, function(response){
            let error = JSON.parse(response);
            Swal.fire("", error.message, "error");
        });
    }
</script>