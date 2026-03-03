import { z } from "zod";
import type { PromptParams } from "../common/types";

export const PROMPTS: PromptParams[] = [
  {
    name: "reflect_create_or_edit_test",
    params: {
      title: "Create or Edit Test",
      description:
        "Guide for creating or editing a web or mobile test with Reflect using a connected recording session",
      argsSchema: {
        sessionId: z
          .string()
          .describe("The ID of the connected Reflect recording session"),
        goal: z
          .string()
          .describe("What the test should do or verify"),
      },
    },
    callback: ({ sessionId, goal }: { sessionId: string; goal: string }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Create a Reflect test for session "${sessionId}" that achieves the following goal: ${goal}

Follow these guidelines:

1. After connecting to a session, get the list of segments for the session's platform type so you know what actions could be added via segments vs needing to create new steps.
2. Before performing an action, take a screenshot to understand the current state of the application.
3. Each add_prompt_step request should perform a single action or assertion. Do not combine multiple actions or assertions into a single step.
4. Only perform one action at a time unless you're sure the action won't move the application to a different screen. For example, you can send multiple add_prompt_step requests to fill out individual form fields if those fields are visible on the current screen.
5. Check the list of existing Segments to see if a Segment exists that achieves a similar goal to what you're trying to do next. If so, add the segment instead of creating new steps.
6. If a step fails, use delete_previous_step to remove it and try a different approach.
7. After completing a task, if the task required multiple prompt steps, add a final prompt step that validates the current state of the page based on what you see on the screen.`,
          },
        },
      ],
    }),
  },
];
