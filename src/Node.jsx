import React, { useState, useEffect, useRef } from 'react';
export default function Node({vertex, setPosition, position}) {

    // useEffect(() => {
    //     const randomTop = Math.floor(Math.random() * (window.innerHeight - 100));
    //     const randomLeft = Math.floor(Math.random() * (window.innerWidth - 100));
    //     setPosition({[vertex] : { top: randomTop, left: randomLeft }});
    // }, []);

    useEffect(() => {
        setPosition(position)
    }, [position])

    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        dragging.current = true;
        offset.current.x = e.clientX - position.left;
        offset.current.y = e.clientY - position.top;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseMove = (e) => {
        if (dragging.current) {
            setPosition({
                top: e.clientY - offset.current.y,
                left: e.clientX - offset.current.x,
            });
        }
    }
    const handleMouseUp = () => {
        dragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    return (
        <div
        onMouseDown={handleMouseDown}
        style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: '#4e91fc',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '20px',
            boxShadow: '0 0 5px rgba(0,0,0,0.3)',
        }}
        >
        {vertex}
        </div>
    );
}