function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600">Your booking is confirmed. 🎉</p>
      </div>
    </div>
  );
}

export default Success;
