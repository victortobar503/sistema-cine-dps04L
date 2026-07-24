import Link from "next/link"
import ButtonGeneric from "./ButtonGeneric"

export default function Header(){
    return (
        <>
            <header>
                <ul>
                    <li>
                        <Link href='/'>
                            <ButtonGeneric color = "">
                                Inicio
                            </ButtonGeneric>
                        </Link>
                    </li>
                    <li>
                        <Link href='/peliculas'>
                            <ButtonGeneric color = "">
                                Peliculas
                            </ButtonGeneric>
                        </Link>
                    </li>
                    <li>
                        <Link href='/historial-ventas'>
                            <ButtonGeneric color = "">
                                Historial de Ventas
                            </ButtonGeneric>
                        </Link>
                    </li>
                    <li>
                        <Link href='/dashboard'>
                            <ButtonGeneric color = "">
                                Dashboard
                            </ButtonGeneric>
                        </Link>
                    </li>
                </ul>
            </header>
        </>
    )
}