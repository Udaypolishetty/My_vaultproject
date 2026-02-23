import React from 'react';
import TaskForm from '../ClubForm';
function JoinClub () {
    return (
        <>
        <div className = "flex flex-col">
            <h1 className = "text-center font-bold mb-2">Join The Club</h1>
            <div className = {`flex w-full md:h-[10vw] items-center gap-4
                 bg-gradient-to-br from-[#0b0b0b] to-[#121212]
                 border border-white/10 p-5 rounded-xl
                 hover:border-[#26F2D0]/40 transition cursor-pointer`}>
           {/* <TaskForm /> */}
        </div>
        </div>
        </>
    )
};
export default JoinClub;