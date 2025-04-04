"use client";

import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Define the GuestbookEntry interface
interface GuestbookEntry {
  _id: string;
  name: string;
  message: string;
  email: string;
  location?: string;
  date: string;
  createdAt: string;
}

// Define a custom error interface to avoid using 'any'
interface CustomError extends Error {
  name: string;
  message: string;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    location: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<string>("");

  // Fetch guestbook entries when the component mounts
  useEffect(() => {
    // Set current date safely on client-side only
    setCurrentDate(new Date().toISOString().split("T")[0]);

    const fetchEntries = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch("/api/guestbook", {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok && response.status !== 200) {
          throw new Error("Failed to fetch guestbook entries");
        }

        const data = await response.json();

        if (data.connectionIssue) {
          setError(
            data.error ||
              "There was an issue connecting to the database. Please try again later."
          );
          setEntries([]);
        } else {
          setEntries(data.entries || []);
        }
      } catch (error: unknown) {
        console.error("Error fetching guestbook entries:", error);

        // Cast to CustomError type for type-safe access
        const err = error as CustomError;

        // Different error message for abort/timeout
        if (err.name === "AbortError") {
          setError("Request timed out. The server took too long to respond.");
        } else {
          setError("Failed to load guestbook entries. Please try again later.");
        }

        setEntries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Add a retry function
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);

    fetch("/api/guestbook")
      .then((response) => {
        if (!response.ok && response.status !== 200) {
          throw new Error("Failed to fetch guestbook entries");
        }
        return response.json();
      })
      .then((data) => {
        if (data.connectionIssue) {
          setError(
            data.error ||
              "There was an issue connecting to the database. Please try again later."
          );
          setEntries([]);
        } else {
          setEntries(data.entries || []);
        }
      })
      .catch((error) => {
        console.error("Error retrying guestbook fetch:", error);
        setError("Failed to load guestbook entries. Please try again later.");
        setEntries([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add guestbook entry");
      }

      const data = await response.json();

      // Add the new entry to the entries array
      setEntries([data.entry, ...entries]);

      // Reset the form
      setFormData({ name: "", message: "", location: "", email: "" });
      setShowForm(false);
    } catch (error: unknown) {
      console.error("Error adding guestbook entry:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to add guestbook entry. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <section id="guestbook" className="py-20">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="retro-header inline-block text-3xl font-bold mb-4 px-6 py-2">
            <span className="text-retro-gray">GUEST</span>
            <span className="text-retro-purple">BOOK</span>
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </m.div>

        <div className="retro-container">
          <div className="marquee-container mb-8 bg-black text-white">
            <div className="marquee-content">
              ★ SIGN MY GUESTBOOK ★ LEAVE A MESSAGE ★ A TRADITION SINCE THE 90s
              WEB ★ THANKS FOR VISITING ★
            </div>
          </div>

          <div className="mb-8 text-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="retro-button px-6 py-3 font-bold"
            >
              {showForm ? "CANCEL" : "SIGN GUESTBOOK"}
            </button>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-500 text-white text-center">
              <p>{error}</p>
              <button
                onClick={handleRetry}
                className="mt-2 px-4 py-2 retro-button bg-retro-gray text-white"
                disabled={isLoading}
              >
                {isLoading ? "RETRYING..." : "RETRY"}
              </button>
            </div>
          )}

          <AnimatePresence>
            {showForm && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-12 overflow-hidden"
              >
                <form
                  onSubmit={handleSubmit}
                  className="retro-container bg-retro-beige p-6 border-2 border-black"
                >
                  <h3 className="text-black text-xl mb-4 font-bold text-center">
                    Sign the Guestbook
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-black font-bold mb-2">
                        NAME
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="retro-input w-full p-2 border-2 border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-black font-bold mb-2">
                        LOCATION
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="retro-input w-full p-2 border-2 border-black"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-black font-bold mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="retro-input w-full p-2 border-2 border-black"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-black font-bold mb-2">
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="retro-input w-full p-2 border-2 border-black"
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="retro-button px-6 py-2"
                    >
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                    </button>
                  </div>
                </form>
              </m.div>
            )}
          </AnimatePresence>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="retro-loading"></div>
              <p className="mt-4 text-retro-gray">
                Loading guestbook entries...
              </p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8 bg-retro-beige p-6 border-2 border-black">
              <p className="text-black">
                No entries yet. Be the first to sign the guestbook!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry, index) => (
                <m.div
                  key={entry._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="retro-container p-0 overflow-hidden"
                >
                  <div className="bg-black p-2 flex items-center">
                    <div className="h-3 w-3 rounded-full bg-white mr-2"></div>
                    <div className="text-white font-mono text-sm">
                      ENTRY #{index + 1}
                    </div>
                    <div className="text-retro-beige ml-auto text-xs">
                      {formatDate(entry.date || entry.createdAt)}
                    </div>
                  </div>

                  <div className="p-4 bg-retro-beige">
                    <div className="flex items-center mb-3">
                      <div className="w-6 h-6 bg-black text-white font-bold flex items-center justify-center mr-2">
                        {entry.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-black">{entry.name}</div>
                        <div className="text-xs text-black">
                          {entry.location}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-b border-dotted border-black py-3 my-2">
                      <p className="text-sm text-black">{entry.message}</p>
                    </div>

                    <div className="text-xs text-black mt-2 font-mono">
                      {entry.email}
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <div className="text-xs font-mono text-black">
              <span className="font-bold">[Pages]:</span> 1 of 1 |{" "}
              <span className="font-bold">[Entries]:</span> {entries.length} |{" "}
              <span className="font-bold">[Last Updated]:</span>{" "}
              {entries.length > 0
                ? formatDate(entries[0].createdAt || entries[0].date)
                : currentDate || ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
