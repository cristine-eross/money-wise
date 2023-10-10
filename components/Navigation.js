import {ImStatsBars} from 'react-icons/im'
import Image from 'next/image'

function Nav() {
    return <header className='container max-w-2xl w-full px-6 py-6 rounded-xl mx-auto my-2 bg-stone-300'>
    <div className="flex items-center justify-between max-w-2xl">
      {/*User information*/}
      <div className="flex items-center gap-2">
        {/*img*/}
        <div className="h-[50px] w-[50px] rounded-full overflow-hidden border-cyan-700 border-2">
          <Image src="/me.png" width={50} height={50} alt="profile"></Image>
        </div>
        {/*name*/}
        <p className='text-stone-900 text-lg'>Welcome <span className='font-bold text-cyan-600'>Cristine</span></p>
      </div>
      <nav className="flex items-center gap-4">
        <div><Image src='/logo.svg' alt='logo' width={70} height={70}></Image></div>
        <div><button className='btn btn-danger'>Sign Out</button></div>
      </nav>
    </div>
  </header>
}

export default Nav