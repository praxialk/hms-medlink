import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

const BookAppointmentPage = () => {
    const navigate = useNavigate();
    const { user_id } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        doctor: '',
        hospital: '',
        time: '',
        message: '',
        urgency_level: 'Standard'
    });

    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/appointment.php?user_id=${user_id}`,
                { ...formData, user_id }
            );

            if (res.data.success) {
                setStatus({ type: 'success', message: 'Appointment booked successfully! Redirecting...' });
                setTimeout(() => navigate('/User-Dashboard'), 2000);
            } else {
                setStatus({ type: 'error', message: res.data.error || 'Failed to book appointment' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Connection error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side - Form Card */}
                    <div className="lg:w-7/12">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-50">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
                                <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
                                <p className="text-blue-100">Fill in the details below to schedule your visit.</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                {status.message && (
                                    <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                        <span className="text-xl">{status.type === 'success' ? '✓' : '⚠'}</span>
                                        <p className="font-medium">{status.message}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Full Name</label>
                                        <input
                                            id="name" name="name" type="text" required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50"
                                            value={formData.name} onChange={handleChange} placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
                                        <input
                                            id="email" name="email" type="email" required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50"
                                            value={formData.email} onChange={handleChange} placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="doctor">Select Doctor</label>
                                        <select
                                            id="doctor" name="doctor" required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50"
                                            value={formData.doctor} onChange={handleChange}
                                        >
                                            <option value="">Select a Doctor</option>
                                            <option value="Dr. Chaminda Silva - Cardiologist">Dr. Chaminda Silva - Cardiologist</option>
                                            <option value="Dr. Nadeeka Perera - Pediatrician">Dr. Nadeeka Perera - Pediatrician</option>
                                            <option value="Dr. Rajitha Fernando - Orthopedic Surgeon">Dr. Rajitha Fernando - Orthopedic Surgeon</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="hospital">Select Hospital</label>
                                        <select
                                            id="hospital" name="hospital" required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50"
                                            value={formData.hospital} onChange={handleChange}
                                        >
                                            <option value="">Select a Hospital</option>
                                            <option value="Hospital A">Hospital A</option>
                                            <option value="Hospital B">Hospital B</option>
                                            <option value="Hospital C">Hospital C</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="date">Preferred Date</label>
                                        <input
                                            id="date" name="date" type="date" required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50"
                                            value={formData.date} onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="time">Preferred Time</label>
                                        <input
                                            id="time" name="time" type="time" required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50"
                                            value={formData.time} onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="urgency_level">Urgency</label>
                                        <select
                                            id="urgency_level" name="urgency_level"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-gray-50"
                                            value={formData.urgency_level} onChange={handleChange}
                                        >
                                            <option value="Standard">Standard</option>
                                            <option value="Urgent">Urgent</option>
                                            <option value="Critical">Critical</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="reason">Reason for Visit</label>
                                    <textarea
                                        id="reason" name="message" rows="3"
                                        placeholder="Briefly describe your symptoms..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-gray-50 resize-none"
                                        value={formData.message} onChange={handleChange}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit" disabled={isSubmitting}
                                    className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 ${isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'}`}
                                >
                                    {isSubmitting ? 'Processing...' : 'Complete Booking'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:w-5/12 space-y-8">
                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-blue-50">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Why choose Med Link?</h3>
                            <div className="space-y-6">
                                {[
                                    { title: 'Top Specialists', icon: '👨‍⚕️' },
                                    { title: 'Instant Confirmation', icon: '⚡' },
                                    { title: 'Modern Facilities', icon: '🏥' },
                                    { title: '24/7 Support', icon: '📞' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <span className="text-3xl">{item.icon}</span>
                                        <h4 className="font-bold text-gray-800">{item.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl">
                            <h4 className="text-xl font-bold mb-2">Need Emergency Care?</h4>
                            <p className="text-blue-100 mb-6">Our emergency response team is available 24/7 for immediate assistance.</p>
                            <a href="tel:1990" className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold inline-block hover:bg-blue-50 transition-colors">Call 1990 Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointmentPage;
