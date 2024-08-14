import { useEffect, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase/config';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_title: string;
  address: string;
  imageUrl?: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    job_title: '',
    address: '',
    image: null as File | null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList: User[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewUserFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : null,
      }));
    } else {
      setNewUserFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddUser = async () => {
    try {
      let imageUrl = '';
      if (newUserFormData.image) {
        const imageRef = ref(storage, `user_images/${newUserFormData.email}`);
        await uploadBytes(imageRef, newUserFormData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, 'users'), {
        ...newUserFormData,
        imageUrl,
      });

      setShowAddUserForm(false);
      setNewUserFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        job_title: '',
        address: '',
        image: null,
      });
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList: User[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(usersList);
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Users
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users including their name, job, email, address, and image.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setShowAddUserForm(true)}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Job
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Address
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Image
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.job_title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.address}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.imageUrl && (
                          <img
                            src={user.imageUrl}
                            alt={`${user.first_name} ${user.last_name}`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                          <span className="sr-only">
                            , {user.first_name}
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showAddUserForm} onClose={() => setShowAddUserForm(false)}>
        <DialogPanel className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-8">
            <h2 className="mb-4 text-xl font-semibold">
              Add New User
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={newUserFormData.first_name}
                  onChange={handleNewUserChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={newUserFormData.last_name}
                  onChange={handleNewUserChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={newUserFormData.email}
                  onChange={handleNewUserChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={newUserFormData.password}
                  onChange={handleNewUserChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="job_title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Title
                </label>
                <input
                  id="job_title"
                  name="job_title"
                  type="text"
                  value={newUserFormData.job_title}
                  onChange={handleNewUserChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={newUserFormData.address}
                  onChange={handleNewUserChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleNewUserChange}
                  className="mt-1 block w-full text-sm text-gray-700"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddUserForm(false)}
                  className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddUser}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
