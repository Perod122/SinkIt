"use server"

import { createClient } from "@/utils/supabase/server";

export const addSinking = async (formData: FormData) => {
    const supabase = await createClient();
    
    // Get the current authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
        console.error("Error getting user:", userError);
        throw new Error("User not authenticated");
    }

    const { data, error } = await supabase.from("sinking").insert({
        owner_id: user.id,
        start_date: formData.get("start_date"),
        end_date: formData.get("end_date"),
        payment_type: formData.get("payment_type") || "Monthly",
        amount: parseFloat(formData.get("amount") as string),
    });

    if (error) {
        console.error("Error adding sinking:", error);
        throw new Error("Failed to add sinking");
    }

    return data;
}

export const getSinking = async () => {
    const supabase = await createClient();
    
    // Get the current authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
        console.error("Error getting user:", userError);
        throw new Error("User not authenticated");
    }
    
    // First, get all sinking funds for the user
    const { data, error } = await supabase
        .from("sinking")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });
    
    if (error) {
        console.error("Error getting sinking funds:", error);
        throw new Error("Failed to get sinking funds");
    }
    
    if (!data || data.length === 0) {
        return data;
    }
    
    // Check for sinking funds that should be automatically completed
    const now = new Date();
    const fundsToComplete = data.filter(fund => {
        const endDate = new Date(fund.end_date);
        return now > endDate && fund.status !== "completed";
    });
    
    // Update status to "completed" for expired funds
    if (fundsToComplete.length > 0) {
        for (const fund of fundsToComplete) {
            await supabase
                .from("sinking")
                .update({ status: "completed" })
                .eq("id", fund.id);
        }
        
        // Fetch updated data
        const { data: updatedData, error: updateError } = await supabase
            .from("sinking")
            .select("*")
            .eq("owner_id", user.id)
            .order("created_at", { ascending: false });
            
        if (updateError) {
            console.error("Error getting updated sinking funds:", updateError);
            // Return original data if update fetch fails
            return data;
        }
        
        return updatedData;
    }
    
    return data;
}

// Utility function to check if a sinking fund should be completed
export const shouldBeCompleted = async (endDate: string, currentStatus?: string) => {
    const now = new Date();
    const end = new Date(endDate);
    return now > end && currentStatus !== "completed";
}

export const getActiveSinking = async () => {
    const supabase = await createClient();
    
    // Get the current authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
        console.error("Error getting user:", userError);
        throw new Error("User not authenticated");
    }
    
    // First, get all sinking funds for the user (this will auto-update expired ones)
    const allFunds = await getSinking();
    
    // Filter out completed funds
    const activeFunds = allFunds?.filter(fund => fund.status !== "completed") || [];
    
    return activeFunds;
}

export const completedSinking = async (id: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("sinking").update({ status: "completed" }).eq("id", id);
    
    if (error) {
        console.error("Error updating sinking status:", error);
        throw new Error("Failed to update sinking status");
    }
    
    return data;
}

export const deleteSinking = async (id: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("sinking").delete().eq("id", id);
    if (error) {
        console.error("Error deleting sinking:", error);
        throw new Error("Failed to delete sinking");
    }
    return data;
}

export const getSinkingById = async (id: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("sinking").select("*").eq("id", id);
    if (error) {
        console.error("Error getting sinking by id:", error);
        throw new Error("Failed to get sinking by id");
    }
    
    if (!data || data.length === 0) {
        return data;
    }
    
    const fund = data[0];
    const now = new Date();
    const endDate = new Date(fund.end_date);
    
    // Check if the fund should be automatically completed
    if (now > endDate && fund.status !== "completed") {
        await supabase
            .from("sinking")
            .update({ status: "completed" })
            .eq("id", id);
            
        // Fetch updated data
        const { data: updatedData, error: updateError } = await supabase
            .from("sinking")
            .select("*")
            .eq("id", id);
            
        if (updateError) {
            console.error("Error getting updated sinking by id:", updateError);
            // Return original data if update fetch fails
            return data;
        }
        
        return updatedData;
    }
    
    return data;
}

export const addSinkingMember = async (formData: FormData) => {
    const supabase = await createClient();
    
    const { data, error } = await supabase.from("sink_members").insert({
        sink_id: formData.get("sink_id"),
        first_name: formData.get("first_name"),
        lastName: formData.get("lastName"),
        count: parseInt(formData.get("count") as string) || 0,
    });

    if (error) {
        console.error("Error adding sinking member:", error);
        throw new Error("Failed to add sinking member");
    }
    const totalMember = await getSinkingMembers(formData.get("sink_id") as string);

    return {
        member: data,
        totalMember
    };
}

export const getSinkingMembers = async (sinkId: string) => {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from("sink_members")
        .select("*")
        .eq("sink_id", sinkId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error getting sinking members:", error);
        throw new Error("Failed to get sinking members");
    }

    return data;
}

export const getSinkingMemberById = async (memberId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("sink_members").select("*").eq("id", memberId);
    return data;
}

export const deleteSinkingMember = async (id: string) => {
    const supabase = await createClient();
    
    const { error } = await supabase
        .from("sink_members")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting sinking member:", error);
        throw new Error("Failed to delete sinking member");
    }
}

export const addContribution = async (formData: FormData) => {
    const supabase = await createClient();
    
    const { data, error } = await supabase.from("contributions").insert({
        contri_id: formData.get("contri_id"),
        amount: parseFloat(formData.get("amount") as string),
        date_paid: formData.get("date_paid") || new Date().toISOString(),
        sink_term: formData.get("sink_term"),
    });

    if (error) {
        console.error("Error adding contribution:", error);
        throw new Error("Failed to add contribution");
    }
    
    // Fetch and return total contributions after adding
    const totalContributions = await getTotalContributions(formData.get("sink_term") as string);
    
    return {
        contribution: data,
        totalContributions
    };
}

export const getContributions = async (memberId: string, sinkId: string) => {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from("contributions")
        .select("*")
        .eq("contri_id", memberId)
        .eq("sink_term", sinkId)
        .order("date_paid", { ascending: false });

    if (error) {
        console.error("Error getting contributions:", error);
        throw new Error("Failed to get contributions");
    }

    return data;
}

export const getTotalContributions = async (sinkId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("contributions").select("*").eq("sink_term", sinkId);
    return data;
}