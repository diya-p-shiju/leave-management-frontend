// src/components/Dashboard.tsx
import React from "react";

interface Client {
  id: number;
  client: string;
  country: string;
  contact: string;
  email: string;
  status: string;
  activationDate: string;
  balance: string;
}

const mockClients: Client[] = [
  {
    id: 1,
    client: "Netflix UK",
    country: "United Kingdom",
    contact: "Maddox Blackstone",
    email: "netflix@netflix.com",
    status: "Activated",
    activationDate: "11 Mar 2021",
    balance: "10,000.00 GBP",
  },
  {
    id: 2,
    client: "HBO GO",
    country: "Spain",
    contact: "Leonardo Barker",
    email: "hbo@hbo.com",
    status: "Blocked",
    activationDate: "11 Mar 2021",
    balance: "0.00 EUR",
  },
  {
    id: 3,
    client: "Glovo UA",
    country: "Ukraine",
    contact: "Vladislav Barkov",
    email: "glovo@glovo.com",
    status: "Blocked",
    activationDate: "11 Mar 2021",
    balance: "0.00 EUR",
  },
  {
    id: 4,
    client: "DHL Parcel",
    country: "Poland",
    contact: "Andrzej Blackstone",
    email: "dhl@dhl.com",
    status: "Deactivated",
    activationDate: "11 Mar 2021",
    balance: "0.00 PLN",
  },
  {
    id: 5,
    client: "Disney UK",
    country: "Poland",
    contact: "Maddox Blackstone",
    email: "disney@disney.com",
    status: "Activated",
    activationDate: "11 Mar 2021",
    balance: "10,000.00 GBP",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white">
        <nav className="p-4">
          <h1 className="text-lg font-bold mb-6">Dashboard</h1>
          <ul className="space-y-4">
            <li className="hover:bg-purple-600 rounded p-2 cursor-pointer">
              Clients
            </li>
            <li className="hover:bg-purple-600 rounded p-2 cursor-pointer">
              Payments
            </li>
            <li className="hover:bg-purple-600 rounded p-2 cursor-pointer">
              Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Clients</h1>
          <button className="bg-purple-600 text-white px-4 py-2 rounded">
            + New Client
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search client"
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button className="bg-gray-300 px-4 py-2 rounded">Filters</button>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Country</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Activation Date</th>
                <th className="px-6 py-3">Balance</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{client.client}</td>
                  <td className="px-6 py-4">{client.country}</td>
                  <td className="px-6 py-4">{client.contact}</td>
                  <td className="px-6 py-4">{client.email}</td>
                  <td
                    className={`px-6 py-4 font-bold ${
                      client.status === "Activated"
                        ? "text-green-600"
                        : client.status === "Blocked"
                        ? "text-red-600"
                        : "text-gray-400"
                    }`}
                  >
                    {client.status}
                  </td>
                  <td className="px-6 py-4">{client.activationDate}</td>
                  <td className="px-6 py-4">{client.balance}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button className="text-blue-600">Edit</button>
                    <button className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;