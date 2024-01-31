import { describe, expect, test } from "@jest/globals";
import { sortByField } from "../utils";

describe("sortByField", () => {
    const mockArray = [
        { id: 2, title: "Task B", lastModifiedTime: "2023-11-01T08:45:00Z" },
        { id: 1, title: "Task A", lastModifiedTime: "2023-12-01T10:30:00Z" },
        { id: 3, title: "Task C", lastModifiedTime: "2023-11-15T15:20:00Z" }
    ];
    
    test("sorts array by 'title' in ascending order", () => {
        const sortedArray = sortByField(mockArray, "title");
        expect(sortedArray).toEqual([
            { id: 1, title: "Task A", lastModifiedTime: "2023-12-01T10:30:00Z" },
            { id: 2, title: "Task B", lastModifiedTime: "2023-11-01T08:45:00Z" },
            { id: 3, title: "Task C", lastModifiedTime: "2023-11-15T15:20:00Z" }
        ]);
    });
    
    test("sorts array by 'title' in descending order", () => {
        const sortedArray = sortByField(mockArray, "title", true);
        expect(sortedArray).toEqual([
            { id: 3, title: "Task C", lastModifiedTime: "2023-11-15T15:20:00Z" },
            { id: 2, title: "Task B", lastModifiedTime: "2023-11-01T08:45:00Z" },
            { id: 1, title: "Task A", lastModifiedTime: "2023-12-01T10:30:00Z" }
        ]);
    });
    
    test("sorts array by 'lastModifiedTime' in ascending order", () => {
        const sortedArray = sortByField(mockArray, "lastModifiedTime");
        expect(sortedArray).toEqual([
            { id: 2, title: "Task B", lastModifiedTime: "2023-11-01T08:45:00Z" },
            { id: 3, title: "Task C", lastModifiedTime: "2023-11-15T15:20:00Z" },
            { id: 1, title: "Task A", lastModifiedTime: "2023-12-01T10:30:00Z" }
        ]);
    });
    
    test("sorts array by 'lastModifiedTime' in descending order", () => {
        const sortedArray = sortByField(mockArray, "lastModifiedTime", true);
        expect(sortedArray).toEqual([
            { id: 1, title: "Task A", lastModifiedTime: "2023-12-01T10:30:00Z" },
            { id: 3, title: "Task C", lastModifiedTime: "2023-11-15T15:20:00Z" },
            { id: 2, title: "Task B", lastModifiedTime: "2023-11-01T08:45:00Z" }
        ]);
    });
});
