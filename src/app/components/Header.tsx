import Link from "next/link"
import ButtonGeneric from "./ButtonGeneric"

export default function Header(){
    return (
        <>
            <header>
                <ul style={{color: "#fff"}}>
                    <li>
                        <Link href='/'>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href='/peliculas'>
                           Peliculas
                        </Link>
                    </li>
                    <li>
                        <Link href='/historial-ventas'>
                            Historial de Ventas
                        </Link>
                    </li>
                    <li>
                        <Link href='/dashboard'>
                            Dashboard
                        </Link>
                    </li>
                </ul>
            </header>
        </>
    )
}