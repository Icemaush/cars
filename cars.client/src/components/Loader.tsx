import { Backdrop, CircularProgress } from "@mui/material";

interface LoaderProps {
  loading: boolean
}

const Loader = (props: LoaderProps) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={props.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
   )
}

export default Loader;