import React, { useState } from 'react'
import { Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import './style.less'

function UploadCom() {
  const [imgUrl, setImg] = useState('')
  const [loading, setLoad] = useState(false)

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  return (
    <div>
      <Upload
        name="avatar"
        showUploadList={false}
        listType="picture-card"
        className="avatar-uploader"
      >
        {imgUrl ? (
          <img src={imgUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}

export default UploadCom
