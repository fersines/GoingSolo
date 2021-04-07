import { useLocation } from "react-router-dom";

export default function useQueryString() {
  const { search, pathname } = useLocation();
  const query = new URLSearchParams(search);
  return [query, pathname];
}
