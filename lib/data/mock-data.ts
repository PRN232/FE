import {
    MedicalExamination,
    MedicalIncident,
    MedicineRequest,
    Student,
    User,
    VaccinationCampaign
} from "@/types";
import {
    Activity,
    Calendar,
    CheckCircle,
    FileText,
    Shield,
    Users,
    Star,
    Award,
    Heart,
    Stethoscope,
    AlertTriangle,
    BookOpen,
} from "lucide-react";

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

export const parentFeatures = [
    {
        title: "Hồ sơ Sức khỏe",
        href: "/parents/health-records",
        description: "Quản lý thông tin sức khỏe, dị ứng và tiền sử y tế của con bạn.",
        icon: FileText,
    },
    {
        title: "Yêu cầu Thuốc",
        href: "/parents/medicine-requests",
        description: "Gửi và theo dõi yêu cầu quản lý thuốc cho con bạn.",
        icon: Shield,
    },
]

export const medicalFeatures = [
    {
        title: "Sự cố Y tế",
        href: "/medical-staff/incidents",
        description: "Ghi nhận và quản lý các sự cố y tế và tình huống khẩn cấp.",
        icon: Activity,
    },
    {
        title: "Kho Thuốc",
        href: "/medical-staff/medicine-inventory",
        description: "Quản lý yêu cầu thuốc và theo dõi kho thuốc.",
        icon: Shield,
    },
    {
        title: "Chiến dịch Tiêm chủng",
        href: "/medical-staff/vaccination",
        description: "Tổ chức và giám sát các chương trình tiêm chủng.",
        icon: Users,
    },
    {
        title: "Khám sức khỏe",
        href: "/medical-staff/examination",
        description: "Lên lịch và thực hiện các đợt khám sức khỏe định kỳ.",
        icon: Calendar,
    },
]

export const teamMembers = [
    {
        id: "1",
        name: "Bác sĩ Sarah Johnson",
        role: "Giám đốc Y tế",
        specialization: "Y học Nhi khoa",
        experience: "15+ năm",
        image: "/images/doctor1.jpg",
        description: "Dẫn dắt đội ngũ y tế của chúng tôi với nhiều kinh nghiệm trong các chương trình sức khỏe trường học.",
    },
    {
        id: "2",
        name: "Y tá Mary Wilson",
        role: "Trưởng Y tá",
        specialization: "Dịch vụ Sức khỏe Trường học",
        experience: "12+ năm",
        image: "/images/doctor2.jpg",
        description: "Phối hợp các dịch vụ sức khỏe hàng ngày và giao thức ứng phó khẩn cấp.",
    },
    {
        id: "3",
        name: "Bác sĩ Michael Chen",
        role: "Bác sĩ Trường học",
        specialization: "Y học Gia đình",
        experience: "10+ năm",
        image: "/images/doctor3.jpg",
        description: "Cung cấp dịch vụ chăm sóc y tế toàn diện và các chương trình giáo dục sức khỏe.",
    },
    {
        id: "4",
        name: "Lisa Rodriguez",
        role: "Điều phối viên Sức khỏe",
        specialization: "Y tế Công cộng",
        experience: "8+ năm",
        image: "/images/doctor4.jpg",
        description: "Quản lý các chương trình tiêm chủng và sáng kiến kiểm tra sức khỏe.",
    },
];
export const services = [
    {
        icon: Stethoscope,
        title: "Khám sức khỏe",
        description: "Kiểm tra sức khỏe toàn diện hàng năm và kiểm tra định kỳ cho tất cả học sinh.",
    },
    {
        icon: Shield,
        title: "Chương trình Tiêm chủng",
        description: "Dịch vụ tiêm chủng đầy đủ theo lịch tiêm chủng quốc gia.",
    },
    {
        icon: Heart,
        title: "Chăm sóc Khẩn cấp",
        description: "Phản hồi khẩn cấp 24/7 và dịch vụ sơ cứu trong giờ học.",
    },
    {
        icon: Activity,
        title: "Theo dõi Sức khỏe",
        description: "Theo dõi liên tục tình trạng sức khỏe và bệnh mãn tính của học sinh.",
    },
    {
        icon: Users,
        title: "Giáo dục Sức khỏe",
        description: "Các chương trình giáo dục thúc đẩy lối sống lành mạnh và phòng ngừa bệnh tật.",
    },
    {
        icon: Calendar,
        title: "Lịch hẹn",
        description: "Lịch hẹn trực tuyến dễ dàng cho tư vấn và các cuộc hẹn theo dõi.",
    },
];

export const achievements = [
    {
        icon: Award,
        title: "Giải thưởng Xuất sắc về Sức khỏe",
        year: "2023",
        description: "Được công nhận vì thực hiện xuất sắc chương trình sức khỏe trường học.",
    },
    {
        icon: Star,
        title: "100% Phủ sóng Tiêm chủng",
        year: "2022-2023",
        description: "Đạt được 100% phủ sóng tiêm chủng cho tất cả học sinh đăng ký.",
    },
    {
        icon: CheckCircle,
        title: "Cơ sở Y tế Được Công nhận",
        year: "2021",
        description: "Được Hiệp hội Sức khỏe Trường học Quốc gia chứng nhận.",
    },
];

export const stats = [
    { number: "2,500+", label: "Học sinh Được Phục vụ" },
    { number: "15+", label: "Năm Hoạt động" },
    { number: "24/7", label: "Phản hồi Khẩn cấp" },
    { number: "100%", label: "Sự Hài lòng của Phụ huynh" },
];

export const documents = [
    {
        id: "1",
        title: "Student Health Record Form",
        description: "Complete health information form for new student enrollment",
        category: "Forms",
        type: "PDF",
        size: "2.3 MB",
        lastUpdated: new Date("2023-09-01"),
        icon: FileText,
        color: "bg-blue-500",
    },
    {
        id: "2",
        title: "Vaccination Consent Form",
        description: "Parental consent form for school vaccination programs",
        category: "Vaccination",
        type: "PDF",
        size: "1.8 MB",
        lastUpdated: new Date("2023-09-15"),
        icon: Shield,
        color: "bg-green-500",
    },
    {
        id: "3",
        title: "Medicine Administration Authorization",
        description: "Authorization form for administering medication to students",
        category: "Medicine",
        type: "PDF",
        size: "1.5 MB",
        lastUpdated: new Date("2023-08-20"),
        icon: Heart,
        color: "bg-red-500",
    },
    {
        id: "4",
        title: "Emergency Contact Information",
        description: "Emergency contact details and medical information form",
        category: "Emergency",
        type: "PDF",
        size: "1.2 MB",
        lastUpdated: new Date("2023-09-10"),
        icon: AlertTriangle,
        color: "bg-orange-500",
    },
    {
        id: "5",
        title: "Health Screening Guidelines",
        description: "Comprehensive guidelines for annual health screenings",
        category: "Guidelines",
        type: "PDF",
        size: "3.1 MB",
        lastUpdated: new Date("2023-08-15"),
        icon: BookOpen,
        color: "bg-purple-500",
    },
    {
        id: "6",
        title: "Allergy Management Plan",
        description: "Template for creating individual allergy management plans",
        category: "Allergies",
        type: "PDF",
        size: "2.7 MB",
        lastUpdated: new Date("2023-09-05"),
        icon: AlertTriangle,
        color: "bg-yellow-500",
    },
]