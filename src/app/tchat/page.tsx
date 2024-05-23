'use client'

import { useEffect } from "react";
import io from 'socket.io-client';

const Tchat = () => {

    useEffect (() => {
        io('localhost:4620')
    })

    return (<></>)
}

export default Tchat;