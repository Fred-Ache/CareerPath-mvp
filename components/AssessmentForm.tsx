"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { recommendMatches, type AssessmentAnswer } from "@/lib/recommendation";

const questions = [
  { id: "q1", text: "I enjoy solving technical or logic-based problems." },
  { id: "q2", text: "I like practical, hands-on work more than desk-only tasks." },
  { id: "q3", text: "I enjoy helping people directly in everyday situations." },
  { id: "q4", text: "I like expressing ideas creatively or visually." },
  { id: "q5", text: "I am interested in computers, apps, or digital systems." },
  { id: "q6", text: "I enjoy speaking, presenting, or influencing others." },
  { id: "q7", text: "I like working with design, structure, or layouts." },
  { id: "q8", text: "I prefer tasks with clear systems and processes." },
  { id: "q9", text: "I care about making a difference in my community." },
  { id: "q10", text: "I enjoy learning new information and explaining it to others." },
  { id: "q11", text: "I like working with tools, machines, or physical materials." },
  { id: "q12", text: "I enjoy planning, organising, and managing details." },
  { id: "q13", text: "I prefer teamwork and collaborative problem-solving." },
  { id: "q14", text: "I like creating products people can use and enjoy." },
  { id: "q15", text: "I am interested in systems that power homes, transport, or cities." },
  { id: "q16", text: "I like figuring out how to improve experiences and services." },
  { id: "q17", text: "I enjoy learning in environments shaped by nature or the outdoors." },
  { id: "q18", text: "I am motivated by ideas, storytelling, and communication." },
  { id: "q19", text: "I like structured work that helps people, organisations, or public life." },
  { id: "q20", text: "I want a career that can grow with my skills over time." },
] as const;

const options = [
  { value: "low", label: "Not like me" },
  { value: "medium", label: "Sometimes" },
  { value: "high", label: "Very much" },
] as const;

type QuestionId = (typeof questions)[number]["id"];

type FormState = Record<QuestionId, AssessmentAnswer["value"]>;

const emptyAnswers: FormState = {
  q1: "low",
  q2: "low",
  q3: "low",
  q4: "low",
  q5: "low",
  q6: "low",
  q7: "low",
  q8: "low",
  q9: "low",
  q10: "low",
  q11: "low",
  q12: "low",
  q13: "low",
  q14: "low",
  q15: "low",
  q16: "low",
  q17: "low",
  q18: "low",
  q19: "low",
  q20: "low",
};

export function AssessmentForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState<FormState>(emptyAnswers);
  const [submitted, setSubmitted] = useState(false);

  const completedCount = useMemo(
    () =>
      Object.values(answers).filter((value) => value !== "low" || true).length,
    [answers],
  );

  const updateAnswer = (questionId: QuestionId, value: AssessmentAnswer["value"]) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: AssessmentAnswer[] = questions.map((question) => ({
      questionId: question.id,
      value: answers[question.id],
    }));

    localStorage.setItem("careerpath-assessment", JSON.stringify(payload));
    const matches = recommendMatches(payload);
    localStorage.setItem("careerpath-results", JSON.stringify(matches));
    setSubmitted(true);
    router.push("/results");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
            Career assessment
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink-900 md:text-4xl">
            Tell us what suits you
          </h1>
        </div>
        <div className="rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-700">
          {completedCount} answers recorded
        </div>
      </div>

      <div className="space-y-5">
        {questions.map((question, index) => (
          <fieldset
            key={question.id}
            className="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm"
          >
            <legend className="mb-3 text-base font-medium text-ink-900">
              <span className="mr-2 text-forest-600">{index + 1}.</span>
              {question.text}
            </legend>

            <div className="grid gap-2 sm:grid-cols-3">
              {options.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    answers[question.id] === option.value
                      ? "border-forest-600 bg-forest-50 text-forest-700"
                      : "border-forest-100 bg-white text-ink-700 hover:border-forest-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={() => updateAnswer(question.id, option.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-forest-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-700">
          This is an exploration tool, not a fixed prediction.
        </p>
        <button
          type="submit"
          className="inline-flex rounded-full bg-forest-600 px-6 py-3 text-sm font-semibold text-white hover:bg-forest-700"
        >
          {submitted ? "Submitted" : "See my matches"}
        </button>
      </div>
    </form>
  );
}
