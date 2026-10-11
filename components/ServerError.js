'use client';
import ErrorPage from '../app/error';
export default function ServerError(){return <ErrorPage reset={()=>window.location.reload()}/>}
