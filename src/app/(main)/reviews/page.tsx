'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RatingStars = ({ rating, setRating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`w-6 h-6 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          <StarIcon className="w-6 h-6" />
        </button>
      ))}
    </div>
  )
}

const FeedbackPage = () => {
  const [user, setUser] = useState<{ email: string; imageUrl: string | null } | null>(null)
  const [rating, setRating] = useState<number>(0)
  const [title, setTitle] = useState('')
  const [feedback, setFeedback] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const cookies = nookies.get()
        const userId = cookies.userID

        if (userId) {
          const userDoc = await getDoc(doc(db, 'users', userId))
          if (userDoc.exists()) {
            setUser(userDoc.data() as { email: string; imageUrl: string | null })
          }
        } else {
          router.push('/signin') // Redirect to login if no user ID
        }
      } catch (error) {
        console.error('Error fetching user details: ', error)
        router.push('/signin') // Redirect to login on error
      }
    }

    fetchUserDetails()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const feedbackData = {
        userId: user.email, // Assuming user email as unique identifier
        userName: user.email.split('@')[0], // Extracting a username from email for simplicity
        userImage: user.imageUrl,
        rating,
        title,
        feedback,
        timestamp: new Date(),
      }

      await setDoc(doc(db, 'feedback', new Date().toISOString()), feedbackData)
      toast.success('Feedback submitted successfully!')
      setRating(0)
      setTitle('')
      setFeedback('')
    } catch (error) {
      console.error('Error submitting feedback: ', error)
      toast.error('Failed to submit feedback.')
    }
  }

  if (!user) return null

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6">Submit Feedback</h1>
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <Image
              alt="User profile"
              src={user.imageUrl || 'https://via.placeholder.com/64'}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300">
                  <label htmlFor="title" className="sr-only">Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title (up to 30 characters)"
                    maxLength={30}
                    className="block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="py-2">
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows={3}
                    placeholder="Add your feedback..."
                    className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center mb-4">
                <RatingStars rating={rating} setRating={setRating} />
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default FeedbackPage
