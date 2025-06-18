import { User, Student, HealthRecord, MedicineRequest, MedicalIncident, VaccinationCampaign, MedicalExamination } from '../types'

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@school.edu',
        role: 'medical_staff',
        avatar: '/placeholder.svg?height=40&width=40',
        createdAt: new Date('2023-01-15')
    },
    {
        id: '2',
        name: 'John Smith',
        email: 'john.smith@email.com',
        role: 'parent',
        avatar: '/placeholder.svg?height=40&width=40',
        createdAt: new Date('2023-02-20')
    },
    {
        id: '3',
        name: 'Admin User',
        email: 'admin@school.edu',
        role: 'admin',
        avatar: '/placeholder.svg?height=40&width=40',
        createdAt: new Date('2023-01-01')
    }
]

export const mockStudents: Student[] = [
    {
        id: '1',
        name: 'Emma Smith',
        dateOfBirth: new Date('2015-03-15'),
        grade: '3rd Grade',
        class: '3A',
        parentId: '2',
        avatar: '/placeholder.svg?height=40&width=40',
        healthRecord: {
            id: '1',
            studentId: '1',
            allergies: ['Peanuts', 'Shellfish'],
            chronicDiseases: ['Asthma'],
            treatmentHistory: [
                {
                    id: '1',
                    date: new Date('2023-09-15'),
                    condition: 'Common Cold',
                    treatment: 'Rest and fluids',
                    doctor: 'Dr. Johnson',
                    notes: 'Recovered well'
                }
            ],
            vision: {
                leftEye: '20/20',
                rightEye: '20/25',
                testDate: new Date('2023-08-01'),
                notes: 'Slight weakness in right eye'
            },
            hearing: {
                result: 'normal',
                testDate: new Date('2023-08-01')
            },
            vaccinations: [
                {
                    id: '1',
                    vaccine: 'MMR',
                    date: new Date('2023-06-01'),
                    batch: 'MMR-2023-001',
                    administeredBy: 'Dr. Sarah Johnson',
                    nextDue: new Date('2028-06-01')
                }
            ],
            lastUpdated: new Date('2023-09-20')
        }
    },
    {
        id: '2',
        name: 'Michael Johnson',
        dateOfBirth: new Date('2014-07-22'),
        grade: '4th Grade',
        class: '4B',
        parentId: '2',
        avatar: '/placeholder.svg?height=40&width=40',
        healthRecord: {
            id: '2',
            studentId: '2',
            allergies: [],
            chronicDiseases: [],
            treatmentHistory: [],
            vision: {
                leftEye: '20/20',
                rightEye: '20/20',
                testDate: new Date('2023-08-01')
            },
            hearing: {
                result: 'normal',
                testDate: new Date('2023-08-01')
            },
            vaccinations: [
                {
                    id: '2',
                    vaccine: 'DTaP',
                    date: new Date('2023-05-15'),
                    batch: 'DTAP-2023-002',
                    administeredBy: 'Dr. Sarah Johnson',
                    nextDue: new Date('2028-05-15')
                }
            ],
            lastUpdated: new Date('2023-08-15')
        }
    }
]

export const mockMedicineRequests: MedicineRequest[] = [
    {
        id: '1',
        studentId: '1',
        parentId: '2',
        medicineName: 'Albuterol Inhaler',
        dosage: '2 puffs',
        frequency: 'As needed',
        duration: 'Ongoing',
        instructions: 'Use when experiencing asthma symptoms',
        status: 'approved',
        requestDate: new Date('2023-09-01'),
        approvedBy: 'Dr. Sarah Johnson',
        notes: 'Keep in health room for emergency use'
    },
    {
        id: '2',
        studentId: '2',
        parentId: '2',
        medicineName: 'Children\'s Tylenol',
        dosage: '160mg',
        frequency: 'Every 6 hours',
        duration: '3 days',
        instructions: 'For fever management',
        status: 'pending',
        requestDate: new Date('2023-09-20')
    }
]

export const mockMedicalIncidents: MedicalIncident[] = [
    {
        id: '1',
        studentId: '1',
        type: 'accident',
        description: 'Student fell during recess and scraped knee',
        severity: 'low',
        treatmentGiven: 'Cleaned wound, applied bandage',
        medicineUsed: ['Antiseptic', 'Bandage'],
        handledBy: 'Dr. Sarah Johnson',
        parentNotified: true,
        date: new Date('2023-09-18'),
        followUpRequired: false,
        status: 'resolved'
    },
    {
        id: '2',
        studentId: '2',
        type: 'fever',
        description: 'Student reported feeling unwell with fever of 101°F',
        severity: 'medium',
        treatmentGiven: 'Temperature monitoring, rest in health room',
        medicineUsed: ['Thermometer'],
        handledBy: 'Dr. Sarah Johnson',
        parentNotified: true,
        date: new Date('2023-09-20'),
        followUpRequired: true,
        status: 'open'
    }
]

export const mockVaccinationCampaigns: VaccinationCampaign[] = [
    {
        id: '1',
        name: 'Fall 2023 Flu Vaccination',
        vaccine: 'Influenza',
        targetGrades: ['K', '1st', '2nd', '3rd', '4th', '5th'],
        scheduledDate: new Date('2023-10-15'),
        consentDeadline: new Date('2023-10-10'),
        status: 'consent_collection',
        studentsEligible: 450,
        consentsReceived: 320,
        vaccinated: 0
    },
    {
        id: '2',
        name: 'HPV Vaccination Program',
        vaccine: 'HPV',
        targetGrades: ['6th', '7th'],
        scheduledDate: new Date('2023-11-01'),
        consentDeadline: new Date('2023-10-25'),
        status: 'planning',
        studentsEligible: 120,
        consentsReceived: 0,
        vaccinated: 0
    }
]

export const mockMedicalExaminations: MedicalExamination[] = [
    {
        id: '1',
        name: 'Annual Health Screening',
        type: 'annual',
        targetGrades: ['K', '1st', '2nd', '3rd', '4th', '5th'],
        scheduledDate: new Date('2023-10-01'),
        notificationSent: true,
        status: 'in_progress',
        studentsScheduled: 450,
        studentsExamined: 180
    },
    {
        id: '2',
        name: 'Vision and Hearing Test',
        type: 'vision',
        targetGrades: ['1st', '3rd', '5th'],
        scheduledDate: new Date('2023-09-25'),
        notificationSent: true,
        status: 'completed',
        studentsScheduled: 180,
        studentsExamined: 175
    }
]

export const mockBlogPosts = [
    {
        id: '1',
        title: 'Preparing Your Child for the School Health Screening',
        excerpt: 'Tips and information to help your child feel comfortable during their annual health check-up.',
        content: 'Annual health screenings are an important part of ensuring your child\'s well-being...',
        author: 'Dr. Sarah Johnson',
        publishedAt: new Date('2023-09-15'),
        category: 'Health Screening'
    },
    {
        id: '2',
        title: 'Managing Allergies in the School Environment',
        excerpt: 'A comprehensive guide for parents on how to work with school staff to keep allergic children safe.',
        content: 'Food allergies and environmental allergies can pose serious challenges in school settings...',
        author: 'Nurse Mary Wilson',
        publishedAt: new Date('2023-09-10'),
        category: 'Allergies'
    },
    {
        id: '3',
        title: 'The Importance of Vaccination in Schools',
        excerpt: 'Understanding why vaccines are crucial for maintaining a healthy school community.',
        content: 'Vaccines play a vital role in protecting not just individual students, but the entire school community...',
        author: 'Dr. Sarah Johnson',
        publishedAt: new Date('2023-09-05'),
        category: 'Vaccination'
    }
]
