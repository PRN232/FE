import {MedicalExamination, MedicalIncident, MedicineRequest, Student, User, VaccinationCampaign} from "@/types";

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Bác sĩ Sarah Johnson',
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
        name: 'Người quản trị',
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
        grade: 'Lớp 3',
        class: '3A',
        parentId: '2',
        avatar: '/placeholder.svg?height=40&width=40',
        healthRecord: {
            id: '1',
            studentId: '1',
            allergies: ['Đậu phộng', 'Hải sản có vỏ'],
            chronicDiseases: ['Hen suyễn'],
            treatmentHistory: [
                {
                    id: '1',
                    date: new Date('2023-09-15'),
                    condition: 'Cảm lạnh thông thường',
                    treatment: 'Nghỉ ngơi và uống nhiều nước',
                    doctor: 'Bác sĩ Johnson',
                    notes: 'Phục hồi tốt'
                }
            ],
            vision: {
                leftEye: '20/20',
                rightEye: '20/25',
                testDate: new Date('2023-08-01'),
                notes: 'Mắt phải hơi yếu'
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
                    administeredBy: 'Bác sĩ Sarah Johnson',
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
        grade: 'Lớp 4',
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
                    administeredBy: 'Bác sĩ Sarah Johnson',
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
        medicineName: 'Ống hít Albuterol',
        dosage: '2 nhát',
        frequency: 'Khi cần thiết',
        duration: 'Liên tục',
        instructions: 'Sử dụng khi có triệu chứng hen suyễn',
        status: 'approved',
        requestDate: new Date('2023-09-01'),
        approvedBy: 'Bác sĩ Sarah Johnson',
        notes: 'Để tại phòng y tế dùng khi khẩn cấp'
    },
    {
        id: '2',
        studentId: '2',
        parentId: '2',
        medicineName: 'Tylenol trẻ em',
        dosage: '160mg',
        frequency: 'Mỗi 6 giờ',
        duration: '3 ngày',
        instructions: 'Sử dụng khi sốt',
        status: 'pending',
        requestDate: new Date('2023-09-20')
    }
]

export const mockMedicalIncidents: MedicalIncident[] = [
    {
        id: '1',
        studentId: '1',
        type: 'accident',
        description: 'Học sinh bị ngã trong giờ ra chơi và trầy đầu gối',
        severity: 'low',
        treatmentGiven: 'Làm sạch vết thương, băng bó',
        medicineUsed: ['Thuốc sát trùng', 'Băng gạc'],
        handledBy: 'Bác sĩ Sarah Johnson',
        parentNotified: true,
        date: new Date('2023-09-18'),
        followUpRequired: false,
        status: 'open'
    },
    {
        id: '2',
        studentId: '2',
        type: 'fever',
        description: 'Học sinh cảm thấy không khỏe, nhiệt độ 101°F',
        severity: 'medium',
        treatmentGiven: 'Theo dõi nhiệt độ, nghỉ ngơi tại phòng y tế',
        medicineUsed: ['Nhiệt kế'],
        handledBy: 'Bác sĩ Sarah Johnson',
        parentNotified: true,
        date: new Date('2023-09-20'),
        followUpRequired: true,
        status: 'open'
    }
]

export const mockVaccinationCampaigns: VaccinationCampaign[] = [
    {
        id: '1',
        name: 'Chiến dịch tiêm vắc-xin cúm mùa Thu 2023',
        vaccine: 'Cúm',
        targetGrades: ['Mẫu giáo', 'Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
        scheduledDate: new Date('2023-10-15'),
        consentDeadline: new Date('2023-10-10'),
        status: 'consent_collection',
        studentsEligible: 450,
        consentsReceived: 320,
        vaccinated: 0
    },
    {
        id: '2',
        name: 'Chương trình tiêm vắc-xin HPV',
        vaccine: 'HPV',
        targetGrades: ['Lớp 6', 'Lớp 7'],
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
        name: 'Khám sức khỏe định kỳ hàng năm',
        type: 'annual',
        targetGrades: ['Mẫu giáo', 'Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
        scheduledDate: new Date('2023-10-01'),
        notificationSent: true,
        status: 'in_progress',
        studentsScheduled: 450,
        studentsExamined: 180
    },
    {
        id: '2',
        name: 'Kiểm tra thị lực và thính lực',
        type: 'vision',
        targetGrades: ['Lớp 1', 'Lớp 3', 'Lớp 5'],
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
        title: 'Chuẩn bị cho trẻ tham gia khám sức khỏe tại trường',
        excerpt: 'Những mẹo và thông tin giúp trẻ cảm thấy thoải mái trong buổi khám sức khỏe định kỳ.',
        content: 'Khám sức khỏe hàng năm là một phần quan trọng giúp đảm bảo sức khỏe cho trẻ...',
        author: 'Bác sĩ Sarah Johnson',
        publishedAt: new Date('2023-09-15'),
        category: 'Khám sức khỏe'
    },
    {
        id: '2',
        title: 'Quản lý dị ứng tại môi trường học đường',
        excerpt: 'Hướng dẫn toàn diện cho phụ huynh về cách phối hợp với nhà trường để bảo vệ trẻ bị dị ứng.',
        content: 'Dị ứng thực phẩm và môi trường có thể gây khó khăn nghiêm trọng trong môi trường học đường...',
        author: 'Y tá Mary Wilson',
        publishedAt: new Date('2023-09-10'),
        category: 'Dị ứng'
    },
    {
        id: '3',
        title: 'Tầm quan trọng của tiêm chủng trong trường học',
        excerpt: 'Tại sao vắc-xin lại quan trọng trong việc giữ gìn sức khỏe cộng đồng trường học.',
        content: 'Vắc-xin đóng vai trò then chốt trong việc bảo vệ không chỉ từng học sinh mà còn cả cộng đồng trường học...',
        author: 'Bác sĩ Sarah Johnson',
        publishedAt: new Date('2023-09-05'),
        category: 'Tiêm chủng'
    }
]
