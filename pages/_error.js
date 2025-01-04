function Error({ statusCode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        {statusCode
          ? `Ein ${statusCode} Fehler ist aufgetreten`
          : 'Ein Fehler ist aufgetreten'}
      </h1>
      <p className="text-gray-600">
        Bitte versuchen Sie es später erneut oder kontaktieren Sie den Support.
      </p>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error 