import  { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { ArrowLeft, Save, Plus, X, Edit2 } from 'lucide-react';
import { useAuth } from '../context.tsx/authContext';
import { useToast } from '../hook/useToast';
import { contentAPI } from '../services/authService';
import type { TechnicalSkills } from '../interface/interfaces';

const AdminSkills = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [skillsData, setSkillsData] = useState<TechnicalSkills | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    } else if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadData = async () => {
    try {
      const res = await contentAPI.getSkills();
      setSkillsData(res.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load skills data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await contentAPI.updateSkills({ skills: skillsData?.skills ?? {} });
      toast({
        title: "Success!",
        description: "Skills have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (category:string) => {
    const newSkills = { ...skillsData?.skills ?? {} };
    newSkills[category].push('');
    setSkillsData({ ...skillsData, skills: newSkills });
  };

  const updateSkill = (category:string, index:number, value:string) => {
    const newSkills = { ...skillsData?.skills ?? {} };
    newSkills[category][index] = value;
    setSkillsData({ ...skillsData, skills: newSkills });
  };

  const removeSkill = (category:string, index:number) => {
    const newSkills = { ...skillsData?.skills ?? {} };
    newSkills[category] = newSkills[category].filter((_, i) => i !== index);
    setSkillsData({ ...skillsData, skills: newSkills });
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const newSkills = { ...skillsData?.skills ?? {}, [newCategoryName]: [] };
    setSkillsData({ ...skillsData, skills: newSkills });
    setNewCategoryName('');
  };

  const renameCategory = (oldName:string, newName:string) => {
    if (!newName.trim() || oldName === newName) {
      setEditingCategory(null);
      return;
    }
    const newSkills = { ...skillsData?.skills ?? {} };
    newSkills[newName] = newSkills[oldName];
    delete newSkills[oldName];
    setSkillsData({ ...skillsData, skills: newSkills });
    setEditingCategory(null);
  };

  const removeCategory = (category:string) => {
    const newSkills = { ...skillsData?.skills ?? {} };
    delete newSkills[category];
    setSkillsData({ ...skillsData, skills: newSkills });
  };

  if (loading || !skillsData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  const categories = Object.keys(skillsData?.skills || {});

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Technical Skills</h1>
            </div>
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Add New Category */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Add New Category</h3>
          <div className="flex gap-2">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name (e.g., Frontend, Backend)"
              className="bg-slate-900 border-slate-700 text-white flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            />
            <Button 
              onClick={addCategory}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </Card>

        {/* Skill Categories */}
        {categories.map((category) => (
          <Card key={category} className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              {editingCategory === category ? (
                <div className="flex gap-2 flex-1 mr-4">
                  <Input
                    defaultValue={category}
                    autoFocus
                    onBlur={(e) => renameCategory(category, e.target.value)}
                    onKeyPress={(e: any) => {
                      if (e.key === 'Enter') {
                        renameCategory(category, e.target.value);
                      }
                    }}
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              ) : (
                <h2 className="text-xl font-bold text-white">{category}</h2>
              )}
              <div className="flex gap-2">
                <Button 
                  onClick={() => setEditingCategory(category)}
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-cyan-400"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={() => addSkill(category)}
                  size="sm"
                  className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
                <Button
                  onClick={() => removeCategory(category)}
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillsData.skills[category].map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={skill}
                    onChange={(e) => updateSkill(category, index, e.target.value)}
                    placeholder="Skill name"
                    className="bg-slate-900 border-slate-700 text-white flex-1"
                  />
                  <Button
                    onClick={() => removeSkill(category, index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default AdminSkills;
