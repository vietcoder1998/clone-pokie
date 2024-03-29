import { Box, Container } from "@mui/material";
import Link from "next/link";

export function HomePanel() {
  return (
    <Box>
      <Box
        className={"shadowMid"}
        sx={{
          fontSize: 12,
          background: "white",
          padding: "65px 40px",
          mt: 2,
          mx: 3,
        }}
      >
        <div className="" style={{ fontWeight: 700 }}>
          About Poki
        </div>
        <header>
          <h1 className="">Free Online Games</h1>
        </header>
        <div className="" style={{ fontSize: "1rem" }}>
          <p>
            Poki has the best free online games selection and offers the most
            fun experience to play alone or with friends. We offer instant play
            to all our games without downloads, login, popups or other
            distractions. Our games are playable on desktop, tablet and mobile
            so you can enjoy them at home or on the road. Every month over 60
            million gamers from all over the world play their favorite games on
            Poki.
          </p>
          <h3>Our game selection</h3>
          <p>
            Game developers release fun
            <Link href="http://localhost:8080/new">New Games</Link> on our
            platform on Link daily basis. Our most
            <Link href="http://localhost:8080/popular-games">
              Popular Games
            </Link>
            include hits like
            <Link href="http://localhost:8080/g/subway-surfers">
              Subway Surfers
            </Link>
            <Link href="http://localhost:8080/g/temple-run-2">
              Temple Run 2
            </Link>
            <Link href="http://localhost:8080/g/stickman-hook">
              Stickman Hook
            </Link>{" "}
            and
            <Link href="http://localhost:8080/g/rodeo-stampede-savannah">
              Rodeo Stampede
            </Link>
            . These games are only playable on Poki. We also have online
            classics like{" "}
            <Link href="http://localhost:8080/g/moto-x3m">Moto X3M</Link>
            <Link href="http://localhost:8080/g/venge-io">Venge.io</Link>
            <Link href="http://localhost:8080/g/dinosaur-game">Dino Game</Link>
            <Link href="http://localhost:8080/g/smash-karts">Smash Karts</Link>
            <Link href="http://localhost:8080/g/2048">2048</Link>
            <Link href="http://localhost:8080/g/penalty-shooters-2">
              Penalty Shooters 2
            </Link>
            and{" "}
            <Link href="http://localhost:8080/g/bad-ice-cream">
              Bad Ice-Cream
            </Link>
            to play for free. In total we offer more than 1000 game titles.
          </p>
          <h3>Start playing</h3>
          <p>
            Unsure what game to play? Start your game discovery on our homepage
            or pick Link game from any of these popular categories:
          </p>
          <ul>
            <li>
              <Link href="http://localhost:8080/puzzle">Brain Games</Link>
            </li>
            <li>
              <Link href="http://localhost:8080/io">.io Games</Link>
            </li>
            <li>
              <Link href="http://localhost:8080/two-player">
                2 Player Games
              </Link>
            </li>
            <li>
              <Link href="http://localhost:8080/car">Car Games</Link>
            </li>
            <li>
              <Link href="http://localhost:8080/shooting">Shooting Games</Link>
            </li>
            <li>
              <Link href="http://localhost:8080/new-puzzle">Puzzle Games</Link>
            </li>
          </ul>
          <h3>What is Poki?</h3>
          <p>
            Poki is based in Amsterdam and has Link team of 40 people working on
            our gaming platform. Our goal is to create the ultimate online
            playground. Free and open to all. Read more about the platform we
            are building on our{" "}
            <Link href="https://about.poki.com/">company</Link> page. If you are
            Link game developer looking to achieve success for your game on web,
            discover what we offer and get in touch via
            <Link href="https://developers.poki.com/">Poki for Developers</Link>
            .
          </p>
          <p>
            ¿Buscas
            <Link href="https://poki.com/es" target="_blank">
              juegos
            </Link>
            de Poki en español?
          </p>
          <p>
            Vous cherchez des
            <Link href="https://poki.com/fr" target="_blank">
              jeux
            </Link>
            Poki en français?
          </p>
        </div>
      </Box>
    </Box>
  );
}
