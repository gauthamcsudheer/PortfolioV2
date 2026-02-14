import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 px-8">
        <h1 className="text-4xl font-bold text-brand-primary">
          Gautham C Sudheer
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Digital Specialist Engineer | Full-Stack Developer [cite: 4, 18]
        </p>
      </main>
    </div>
  )
}

export default App;