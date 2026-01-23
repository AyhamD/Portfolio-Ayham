import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { useAuth } from "../context.tsx/authContext";
import { useToast } from "../hook/useToast";
import { contentAPI } from "../services/authService";
import type { educationProps } from "../interface/interfaces";

const AdminEducation: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [educations, setEducations] = useState<educationProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingEducation, setEditingEducation] =
        useState<educationProps | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Partial<educationProps>>({
        degree: "",
        school: "",
        period: "",
        description: "",
    });

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/admin/login");
        } else if (isAuthenticated) {
            loadEducations();
        }
    }, [isAuthenticated, isLoading, navigate]);

    const loadEducations = async () => {
        try {
            const res = await contentAPI.getEducation();
            setEducations(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load education entries",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = {
                school: formData.school || "",
                degree: formData.degree || "",
                period: formData.period || "",
                description: formData.description || "",
            };

            await contentAPI.updateEducation(payload);

            toast({
                title: "Success!",
                description: editingEducation
                    ? "Education updated successfully."
                    : "Education added successfully.",
            });

            resetForm();
            loadEducations();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save education",
                variant: "destructive",
            });
        }
    };

    const handleEdit = (education: educationProps) => {
        setEditingEducation(education);
        setFormData(education);
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            degree: "",
            school: "",
            period: "",
            description: "",
        });
        setEditingEducation(null);
        setShowForm(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-cyan-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/admin/dashboard">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-400 hover:text-white"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold text-white">
                                Education & Courses
                            </h1>
                        </div>
                        <Button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Education
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
                {/* Add/Edit Form */}
                {showForm && (
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">
                                {editingEducation ? "Edit Education" : "Add New Education"}
                            </h2>
                            <Button
                                onClick={resetForm}
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-slate-300 text-sm font-medium mb-2 block">
                                        Degree / Course
                                    </label>
                                    <Input
                                        value={formData.degree}
                                        onChange={(e) =>
                                            setFormData({ ...formData, degree: e.target.value })
                                        }
                                        required
                                        className="bg-slate-900 border-slate-700 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-slate-300 text-sm font-medium mb-2 block">
                                        School / Provider
                                    </label>
                                    <Input
                                        value={formData.school}
                                        onChange={(e) =>
                                            setFormData({ ...formData, school: e.target.value })
                                        }
                                        required
                                        className="bg-slate-900 border-slate-700 text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-slate-300 text-sm font-medium mb-2 block">
                                    Period (e.g. 2018 - 2021)
                                </label>
                                <Input
                                    value={formData.period}
                                    onChange={(e) =>
                                        setFormData({ ...formData, period: e.target.value })
                                    }
                                    required
                                    className="bg-slate-900 border-slate-700 text-white"
                                />
                            </div>

                            <div>
                                <label className="text-slate-300 text-sm font-medium mb-2 block">
                                    Description
                                </label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    rows={4}
                                    required
                                    className="bg-slate-900 border-slate-700 text-white resize-none"
                                />
                            </div>

                            <div className="flex gap-2 justify-end">
                                <Button
                                    type="button"
                                    onClick={resetForm}
                                    variant="outline"
                                    className="border-slate-700"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-cyan-500 hover:bg-cyan-600 text-white"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {editingEducation ? "Update" : "Create"} Education
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                {/* Education List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">
                        All Education & Courses ({educations.length})
                    </h2>

                    {educations.length === 0 ? (
                        <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
                            <p className="text-slate-400">
                                No education entries yet. Click "Add Education" to create one.
                            </p>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {educations.map((edu) => (
                                <Card
                                    key={edu.id}
                                    className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-1">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-cyan-400 font-medium">{edu.school}</p>
                                            <p className="text-slate-500 text-sm mt-1">
                                                {edu.period}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleEdit(edu)}
                                                size="sm"
                                                variant="ghost"
                                                className="text-slate-400 hover:text-cyan-400"
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </div>

                                    <p className="text-slate-300 mb-4">{edu.description}</p>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminEducation;