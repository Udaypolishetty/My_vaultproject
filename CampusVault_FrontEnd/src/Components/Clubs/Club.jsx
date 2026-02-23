import { useState } from "react";
import TaskForm from "../ClubForm";
import AddClub from "./AddClub";
import JoinClub from "./JoinClub";

export default function Club() {
  const student = JSON.parse(localStorage.getItem("studentProfile")) || {};

  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  const pinned = tasks.filter(t => t.pinned);
  const normal = tasks.filter(t => !t.pinned);

  return (
    <div className="space-y-6">

      {/* Header */}
      {/* <div
        className="flex items-center justify-between
                   bg-gradient-to-r from-[#0b0b0b] to-[#141414]
                   border border-white/10 p-6 rounded-2xl shadow-lg"
      >
        <div>
          <h2 className="text-xl font-bold">Tasks</h2>
          <p className="text-gray-400 text-sm">
            Work on tasks and share knowledge
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-[#26F2D0] text-black px-5 py-2 rounded-xl
                     font-semibold hover:bg-[#20d6b8]"
        >
          + Add Task
        </button>
      </div> */}

  <div className = "flex flex-col md:flex-row gap-4">
    <div className = {`w-full md:w-[50vw] min-h-[60vh] rounded-2xl border border-white/10 mb-10
               bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
               backdrop-blur-xl p-6 shadow-lg relative
               shadow-[0_0_25px_rgba(38,242,208,0.12)]
               transition-all duration-300
               hover:-translate-y-1
               hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
               hover:border-[#26F2D0]/40`}>
        <AddClub />
    </div>

    <div className = {`w-full md:w-[50vw] min-h-[60vh] mb-10 rounded-2xl border border-white/10
               bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
               backdrop-blur-xl p-6 shadow-lg relative
               shadow-[0_0_25px_rgba(38,242,208,0.12)]
               transition-all duration-300
               hover:-translate-y-1
               hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
               hover:border-[#26F2D0]/40`}>
          <JoinClub />
    </div>
  </div>

      {/* Pinned Tasks */}
      {pinned.map(task => (
        <TaskRow key={task.id} task={task} pinned />
      ))}

      {/* Normal Tasks */}
      {normal.map(task => (
        <TaskRow key={task.id} task={task} />
      ))}

      {/* Task Form Popup */}
      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onSubmit={(newTask) => {
            const tempTask = {
              id: Date.now(),              // fake id (React key)
              title: newTask.title,
              description: newTask.description,
              tags: newTask.tags || [],
              pinned: newTask.pinned || false,
              replies: [],
              createdAt: Date.now(),
              name: student.name || "Test User",
              branch: student.branch || "CSE",
              year: student.year || "3rd Year"
            };

            setTasks(prev => [tempTask, ...prev]);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
// Time formate
function formatTime(timestamp) {
  const diff = Date.now() - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;

  return new Date(timestamp).toLocaleDateString();
}


/* ---------- TASK ROW ---------- */

function TaskRow({ task, pinned }) {
  return (
    <div
      className="flex items-center gap-4
                 bg-gradient-to-br from-[#0b0b0b] to-[#121212]
                 border border-white/10 p-5 rounded-xl
                 hover:border-[#26F2D0]/40 transition cursor-pointer"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-[#222]
                      flex items-center justify-center text-gray-400">
        👤
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {pinned && (
            <span
              className="text-xs bg-yellow-500/20 text-yellow-400
                         px-2 py-0.5 rounded-full"
            >
              Pinned
            </span>
          )}
          <h3 className="font-semibold">{task.title}</h3>
        </div>

        <p className="text-gray-400 text-sm">{task.description}</p>

        <div
          className="flex flex-wrap items-center gap-4
                     text-xs text-gray-500 mt-2"
        >
          <span>
            {task.name} · {task.branch} · {task.year}
          </span>

          <span>💬 {task.replies.length} replies</span>
          <span>⏱ {formatTime(task.createdAt)}</span>

          {task.tags.map(tag => (
            <span
              key={tag}
              className="bg-[#222] px-2 py-1 rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="text-gray-500 text-xl">›</div>
    </div>
  );
}
