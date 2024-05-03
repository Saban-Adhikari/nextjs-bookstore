import Image from "next/image";

export const generateMetadata = async ({ params }) => {
  const dataform = {
    FLAG: "SI",
    BookID: params.id,
  };

  const data = await singleData(dataform);
  const bookData = data.Values[0];

  return {
    title: bookData.BookName,
    description: bookData.Description,
    openGraph: {
      title: bookData.BookName,
      description: bookData.Description,
      images: [
        {
          url: bookData.Image.url,
          width: 800,
          height: 600,
        },
      ],
    },
  };
};

export const singleData = async (dataform) => {
  try {
    const response = await fetch(`https://htdrnl.cyclic.app/api/book`, {
      method: "POST",
      body: JSON.stringify(dataform),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  } catch (error) {
    console.log("error fetching data: ", error);
  }
};

export default async function Page({ params }) {
  const dataform = {
    FLAG: "SI",
    BookID: params.id,
  };

  const data = await singleData(dataform);
  const bookData = data.Values[0];

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ maxWidth: "800px" }}
      >
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 px-6">
          <h2 className="text-2xl font-bold">
            {bookData && bookData.BookName}
          </h2>
        </div>
        <div className="p-4 flex justify-center">
          <Image
            src={bookData && bookData.Image.url}
            alt={bookData && bookData.BookName}
            width={400}
            height={600}
          />
        </div>
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 font-semibold">Description:</p>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: bookData && bookData.Description,
              }}
            />
          </div>
          <div className="flex flex-wrap">
            <div className="w-1/2 mb-4">
              <p className="text-gray-700 font-semibold">Author:</p>
              <p className="text-gray-700">{bookData && bookData.Auther}</p>
            </div>
            <div className="w-1/2 mb-4">
              <p className="text-gray-700 font-semibold">Genre:</p>
              <p className="text-gray-700">
                {bookData && bookData.Genre[0].title}
              </p>
            </div>
            <div className="w-1/2 mb-4">
              <p className="text-gray-700 font-semibold">Pages:</p>
              <p className="text-gray-700">{bookData && bookData.Page}</p>
            </div>
            <div className="w-1/2 mb-4">
              <p className="text-gray-700 font-semibold">Quantity Available:</p>
              <p className="text-gray-700">{bookData && bookData.Quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
