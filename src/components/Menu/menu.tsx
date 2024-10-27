import Link from 'next/link'

export default function menu() {
    return (
        <nav className='menu'>
            <ul>
                <li><Link href="/">Dashboard</Link></li>
                <li><Link href="/challenge-sprints">Challenge Sprints</Link></li>
                <li><Link href="/checkpoint">CheckPoints</Link></li>
                <li><Link href="/global-solution">Global Solutions</Link></li>
            </ul>
        </nav>
    )
} 