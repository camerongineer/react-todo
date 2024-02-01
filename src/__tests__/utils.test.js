import { describe, expect, test } from "@jest/globals";
import { sortByField } from "../utils";

describe("sortByField", () => {
    const mockArray = [
        { id: 2, title: "task B", createDateTime: "2023-11-01T08:45:00Z" },
        { id: 1, title: "Task A", createDateTime: "2023-12-01T10:30:00Z" },
        { id: 3, title: "Task C", createDateTime: "2023-11-15T15:20:00Z" }
    ];
    
    test("sorts array by 'title' in ascending order", () => {
        const sortedArray = sortByField(mockArray, "title");
        expect(sortedArray).toEqual([
            { id: 1, title: "Task A", createDateTime: "2023-12-01T10:30:00Z" },
            { id: 2, title: "task B", createDateTime: "2023-11-01T08:45:00Z" },
            { id: 3, title: "Task C", createDateTime: "2023-11-15T15:20:00Z" }
        ]);
    });
    
    test("sorts array by 'title' in descending order", () => {
        const sortedArray = sortByField(mockArray, "title", true);
        expect(sortedArray).toEqual([
            { id: 3, title: "Task C", createDateTime: "2023-11-15T15:20:00Z" },
            { id: 2, title: "task B", createDateTime: "2023-11-01T08:45:00Z" },
            { id: 1, title: "Task A", createDateTime: "2023-12-01T10:30:00Z" }
        ]);
    });
    
    test("sorts array by 'createDateTime' in ascending order", () => {
        const sortedArray = sortByField(mockArray, "createDateTime");
        expect(sortedArray).toEqual([
            { id: 2, title: "task B", createDateTime: "2023-11-01T08:45:00Z" },
            { id: 3, title: "Task C", createDateTime: "2023-11-15T15:20:00Z" },
            { id: 1, title: "Task A", createDateTime: "2023-12-01T10:30:00Z" }
        ]);
    });
    
    test("sorts array by 'createDateTime' in descending order", () => {
        const sortedArray = sortByField(mockArray, "createDateTime", true);
        expect(sortedArray).toEqual([
            { id: 1, title: "Task A", createDateTime: "2023-12-01T10:30:00Z" },
            { id: 3, title: "Task C", createDateTime: "2023-11-15T15:20:00Z" },
            { id: 2, title: "task B", createDateTime: "2023-11-01T08:45:00Z" }
        ]);
    });
});
