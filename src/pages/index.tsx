import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { students, type Student } from "@/data/students";
import { api } from "@/utils/api";


export default function Home() {
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]!);
  const [showQuestion, setShowQuestion] = useState(false);

  const studentInfo = {
    text: `Student Name: ${selectedStudent.name} 
           Overall Grade: ${selectedStudent.grade} 
           Interests: ${selectedStudent.interests}`
  }

  const { data, isLoading, error } = api.gemini.testKey.useQuery(studentInfo);

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-slate-200">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="max-w-lg rounded-2xl bg-white px-6 py-4 text-red-600 shadow-sm ring-1 ring-slate-200">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* subtle "classroom" background */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
            <span>📚</span>
            <span>Classroom Assistant</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
            Generate a homework question
          </h1>
          <p className="mt-2 text-slate-600">
            Click the button to reveal the generated question for this student.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          {/* header strip like a “board” */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-medium text-slate-700">
                Today’s Activity
              </div>
              <div className="text-xs text-slate-500">
                Homework generator • Grade-level practice
              </div>
            </div>
            <div className="mt-4">
               <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select Student
              </label>
            <select
                   value={selectedStudent.name}
                   onChange={(e) => {
                   const student = students.find(
                   (s) => s.name === e.target.value
               );
      if (student) {
        setSelectedStudent(student);
        setShowQuestion(false); // reset output when switching students
      }
    }}
    
    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
  >
    {students.map((student) => (
      <option key={student.name} value={student.name}>
        {student.name}
      </option>
    ))}
  </select>
  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700 ring-1 ring-slate-200">
  <div><strong>Name:</strong> {selectedStudent.name}</div>
  <div><strong>Grade:</strong> {selectedStudent.grade}</div>
  <div><strong>Interests:</strong> {selectedStudent.interests}</div>
</div>

</div>
            <button
              onClick={() => setShowQuestion(true)}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Generate Question
            </button>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            {!showQuestion ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <div className="text-sm font-medium text-slate-800">
                  Question will appear here
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Press <span className="font-semibold">Generate Question</span>{" "}
                  to reveal it.
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Generated Question
                  </div>
                  <button
                    onClick={() => setShowQuestion(false)}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Hide
                  </button>
                </div>

                <div className="whitespace-pre-wrap text-slate-900">
                  {data?.text}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
