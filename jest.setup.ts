import "@testing-library/jest-dom";
import "tsconfig-paths/register";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockReturnValue({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
});
