import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, closeModal } from "../store/calendar-slice";

type RootState = {
  calendar: {
    isModalOpen: boolean;
    modalDate?: number;
  };
};

export default function EventModal() {
  const dispatch = useDispatch();
  const { isModalOpen, modalDate } = useSelector((s: RootState) => s.calendar);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isModalOpen || !modalDate) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(
      addEvent({
        title,
        start: modalDate,
      })
    );
    setTitle("");
    dispatch(closeModal());
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3 className="modal-title">Create event</h3>
        <form onSubmit={submit}>
          <input
            autoFocus
            className="modal-input"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Add Description..."
            className=" modal-input-textarea w-full h-32 p-3 custom-scroll"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="modal-actions">
            <button
              type="button"
              className="btn ghost"
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
