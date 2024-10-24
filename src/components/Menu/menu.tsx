import Link from 'next/link'
import "@/app/globals.css"

export default function Menu() {
    return (
        <nav className='menu'>
            <ul>
                <li> <Link href="/challenge-sprints">Challenge Sprints</Link> </li>
                <li> <Link href="/checkpoint">CheckPoint</Link> </li>
                <li> <Link href="/global-solution">Global Solutions</Link> </li>
            </ul>
        </nav>
    )
}