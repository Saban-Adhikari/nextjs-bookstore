"use client";
import Link from "next/link";
import Categories from "./categories";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(-1);
  const [selectedStatus, setSelectedStatus] = useState(-1);
  const { data: session, status } = useSession();

  console.log("heres data ", session);

  const fetchData = async (genre, status) => {
    try {
      const response = await fetch(
        `https://htdrnl.cyclic.app/api/getBook?UserID=-1&Status=${status}&Genres=${genre}`
      );
      const data = await response.json();
      setBooks(data.Values);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedGenre, selectedStatus);
  }, [selectedGenre, selectedStatus]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handleStatus = (status) => {
    setSelectedStatus(status);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mt-8 lg:mt-0">
              <div className="text-lg max-w-prose mx-auto lg:max-w-none">
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Welcome to Our Bookstore
                </h2>
                <p className="mt-4 text-xl text-gray-500">
                  Discover a world of captivating stories and immersive
                  adventures. Explore our extensive collection of books from
                  various genres and find your next favorite read.
                </p>
                <div className="mt-6 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                  <p>
                    At our bookstore we believe that books have the power to
                    transport us to different realms. Ignite our imaginations
                    and broaden our horizons. Whether you are an avid reader or
                    just starting your literary journey. We have something for
                    everyone.
                  </p>
                  <p>
                    Browse through our carefully curated selection, and let our
                    knowledgeable staff guide you to your next great read. Get
                    lost in the pages of a thrilling mystery. Explore distant
                    lands in a captivating historical novel. Or delve into the
                    world of personal growth and self-discovery.
                  </p>
                  <p>
                    Join us on this literary adventure and experience the magic
                    of books like never before.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:mt-0 lg:col-span-1 ">
          <div className="rounded-lg shadow-lg p-6 bg-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Filter Books
            </h3>
            <Categories
              onGenreChange={handleGenreChange}
              onStatusChange={handleStatus}
            />
          </div>
        </div>
      </div>
      <div className="min-h-full mt-8" id="books">
        <ul className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {books && books.length > 0 ? (
            books.map((book) => (
              <li key={book._id} className="mx-2 mb-4 flex-grow">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
                  <Link href="#">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="rounded-t-lg h-[300px] w-full object-cover"
                      src={book.Image.url}
                      alt=""
                    />
                  </Link>
                  <div className="p-5 flex-grow">
                    <Link href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex">
                        {book.BookName}
                      </h5>
                    </Link>
                    <Link
                      href={`card/${book._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="flex flex-row justify-center items-center w-screen">
              {selectedStatus !== "2" ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "No books available"
              )}
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default Page;
