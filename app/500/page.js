import ServerError from '../../components/ServerError';
export const dynamic='force-dynamic';
export const metadata={title:'Something went wrong',robots:{index:false,follow:false}};
export default function Page(){return <ServerError/>}
