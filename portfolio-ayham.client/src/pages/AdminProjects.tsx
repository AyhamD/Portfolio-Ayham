import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { ArrowLeft, Save, Plus, X, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../context.tsx/authContext';
import { useToast } from '../hook/useToast';
import { contentAPI } from '../services/authService';
import type { projectProps } from '../interface/interfaces';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const AdminProjects: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [projects, setProjects] = useState<projectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<projectProps | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<projectProps>>({
    title: '',
    client: '',
    year: '',
    description: '',
    role: '',
    technologies: [],
    category: 'frontend'
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    } else if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadProjects = async () => {
    try {
      const res = await contentAPI.getProjects();
      const data = Array.isArray(res.data) ? res.data : [];
      const sorted = data.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setProjects(sorted);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProject) {
        await contentAPI.updateProject(editingProject.id!, formData);
        toast({ title: "Success!", description: "Project updated successfully." });
      } else {
        await contentAPI.createProject(formData as Omit<projectProps, 'id'>);
        toast({ title: "Success!", description: "Project created successfully." });
      }
      
      resetForm();
      loadProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project: projectProps) => {
    setEditingProject(project);
    setFormData(project);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await contentAPI.deleteProject(id);
      toast({ title: "Success!", description: "Project deleted successfully." });
      loadProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      client: '',
      year: '',
      description: '',
      role: '',
      technologies: [],
      category: 'frontend'
    });
    setEditingProject(null);
    setShowForm(false);
    setTechInput('');
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies?.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter(t => t !== tech) || []
    });
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(projects);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);

    const withOrder = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setProjects(withOrder);

    try {
      await Promise.all(
        withOrder.map((item, index) => {
          if (!item.id) return Promise.resolve();
          return contentAPI.updateProject(item.id, { order: index });
        })
      );
      toast({
        title: "Order updated",
        description: "Project order has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project order",
        variant: "destructive",
      });
    }
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Add/Edit Form */}
        {showForm && (
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
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
                  <label className="text-slate-300 text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">Client</label>
                  <Input
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    required
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">Year</label>
                  <Input
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g., 2024"
                    required
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    required
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-md px-3 py-2"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full-Stack</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Role</label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Frontend Developer"
                  required
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                  className="bg-slate-900 border-slate-700 text-white resize-none"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Technologies</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    placeholder="Add technology"
                    className="bg-slate-900 border-slate-700 text-white flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addTechnology}
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies?.map((tech, idx) => (
                    <div key={idx} className="bg-slate-700 text-white px-3 py-1 rounded-md flex items-center gap-2">
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" onClick={resetForm} variant="outline" className="border-slate-700">
                  Cancel
                </Button>
                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {editingProject ? 'Update' : 'Create'} Project
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">All Projects ({projects.length})</h2>
          
          {projects.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
              <p className="text-slate-400">No projects yet. Click "Add Project" to create one.</p>
            </Card>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="projects-list">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {projects.map((project, index) => (
                      <Draggable
                        key={project.id}
                        draggableId={project.id!}
                        index={index}
                      >
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition-all">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                                  <p className="text-cyan-400 text-sm">{project.client}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleEdit(project)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-slate-400 hover:text-cyan-400"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    onClick={() => handleDelete(project.id!)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-slate-400 hover:text-red-400"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-2 mb-3">
                                <p className="text-slate-400 text-sm"><span className="text-slate-500">Year:</span> {project.year}</p>
                                <p className="text-slate-400 text-sm"><span className="text-slate-500">Role:</span> {project.role}</p>
                                <p className="text-slate-400 text-sm"><span className="text-slate-500">Category:</span> <span className="capitalize">{project.category}</span></p>
                              </div>

                              <p className="text-slate-300 text-sm mb-3 line-clamp-2">{project.description}</p>

                              <div className="flex flex-wrap gap-2">
                                {project.technologies.slice(0, 5).map((tech, idx) => (
                                  <span key={idx} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 5 && (
                                  <span className="bg-slate-700 text-slate-400 text-xs px-2 py-1 rounded">
                                    +{project.technologies.length - 5}
                                  </span>
                                )}
                              </div>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminProjects;