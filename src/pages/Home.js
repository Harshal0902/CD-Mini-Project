import React from 'react'
import CompilerImg from '../assets/compiler.svg'
import FeatImg from '../assets/features.svg'
import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div className='md:mx-28 mx-4 text-white pt-10 pb-12'>

            <div className='md:grid md:grid-cols-2 items-center pt-10 pb-4'>
                <div className=''>
                    <h1 className='text-3xl md:text-6xl'>Who we are</h1>
                    <p className='text-xl py-4 tracking-wider text-justify'>Online Compiler is an open-source online code execution system. It can be used to build a wide range of applications varying from competitive programming platforms, educational and recruitment platforms, to online code editors, and more.</p>

                    <Link to="/compiler">
                        <button className='bg-secondary py-2 px-8 rounded-md text-xl md:text-2xl'>Open Comipler</button>
                    </Link>

                </div>
                <div className="grid place-items-center py-4 drop-shadow-3xl shadow-black">
                    <img src={CompilerImg} alt="img" width="450" height="450" />
                </div>
            </div>

            <div className='md:grid md:grid-cols-2 pt-12 items-center'>
                <div className="grid place-items-center py-4 drop-shadow-3xl shadow-black">
                    <img src={FeatImg} alt="img" width="400" height="400" />
                </div>
                <div className=''>
                    <h1 className='text-3xl md:text-6xl'>What else do we have?</h1>
                    <p className='text-xl md:text-2xl py-4 tracking-wider'> Online Compiler is a web app where you can:
                    </p>
                    <ul className="text-xl">
                        <li className="list-disc">Run and test your code</li>
                        <li className="list-disc">Know the error</li>
                        <li className="list-disc">Languages available are C, C++, Java, Python</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
