import Header from "../components/Header";
export default function Login(){
  return (
    <div className="page">
      <Header />
      <h2 className="text-xl font-extrabold mb-3">Login</h2>
      <form className="grid gap-3">
        <input className="input" placeholder="Email" type="email" required />
        <input className="input" placeholder="Password" type="password" required />
        <button className="btn btn-primary" type="submit">Sign in</button>
      </form>
      <div className="text-sm mt-2">
        <a className="link" href="#">Create account</a> · <a className="link" href="#">Forgot password?</a>
      </div>
    </div>
  )
}
