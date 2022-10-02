import styled from "styled-components";
import { TbFish } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/router";
import Anchor from "./Anchor";

export default function Header() {
  const { pathname } = useRouter();

  return (
    <StyledHeader>
      <FishIcon size="4rem" />
      <StyledNavigation>
        <Link href="/" passHref>
          <Anchor active={pathname === "/"}>Startseite</Anchor>
        </Link>
        <Link href="/products" passHref>
          <Anchor active={pathname === "/products"}>Produkte</Anchor>
        </Link>
        <Link href="/categories" passHref>
          <Anchor active={pathname === "/categories"}>Kategorien</Anchor>
        </Link>
      </StyledNavigation>
    </StyledHeader>
  );
}

const FishIcon = styled(TbFish)`
  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  border-bottom: 1px solid var(--text-primary);
  background-color: var(--background-light);
`;

const StyledNavigation = styled.nav`
  display: flex;
  gap: 2rem;
`;
