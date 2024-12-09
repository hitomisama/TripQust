import React, { useState } from "react";
import { useTaskContext } from "../components/TaskContext.jsx";
import CompleteModal from "./CompleteModal.jsx";
import UploadButton from "../btn/UploadButton.jsx";
import CameraButton from "../btn/CameraButton.jsx";
import PostButton from "../btn/PostButton.jsx";

function PhotoUploadModal({ taskId, onUpload }) {
  const { tasks, setTasks } = useTaskContext();
  const task = tasks.find((t) => t.id === taskId);
  const defaultImage = task?.image || "/LOGO.png";
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (onUpload) {
        onUpload(taskId, reader.result); // 上传后通知父组件更新任务点照片
      }
    };
    if (file instanceof Blob) {
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  return (
    <div className="photo-upload">
      <button onClick={handleOpenModal}>クリア (任务 {taskId})</button>
      <CompleteModal isOpen={isOpen} onClose={handleCloseModal}>
        <h2>任务 {taskId} - 上传照片</h2>
        <div className="upload-section">
          {/* 照片显示区域 */}
          <img
            src={defaultImage}
            alt={`任务 ${taskId}`}
            className="uploaded-image"
            style={{ width: "100%", height: "auto", marginBottom: "20px" }}
          />
          <UploadButton taskId={taskId} onUpload={handleUpload} />
          <CameraButton taskId={taskId} onCapture={handleUpload} />
        </div>
        <div className="post-section">
          <PostButton
            text="Xにシェア"
            onClick={() => console.log(`发布到X: ${defaultImage}`)}
          />
          <PostButton
            text="インスタにシェア"
            onClick={() => console.log(`发布到Instagram: ${defaultImage}`)}
          />
        </div>
      </CompleteModal>
    </div>
  );
}

export default PhotoUploadModal;
