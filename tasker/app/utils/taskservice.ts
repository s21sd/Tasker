export const getAllTheTask = async (userId: string, setTasks: any) => {
    try {
        const res = await fetch(`/api/create?userId=${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const data = await res.json();
        setTasks(data.tasks[0].task); // Updates the state with fetched tasks
    } catch (error) {
        console.log("Error in fetching", error);
    }
};
