from storages.backends.s3boto3 import S3Boto3Storage


class MediaStorage(S3Boto3Storage):
    location = "media"  # /media というURLで配信
    file_overwrite = False  # 同名ファイルは上書きせずに似た名前のファイルに。デフォルトでは同じファイル名のファイルは上書き保存されてしまうため。
