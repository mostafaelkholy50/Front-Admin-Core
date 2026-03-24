/**
 * Centralized UI Messages
 *
 * ALL user-facing strings live here — no hardcoded text in components, hooks, or services.
 *
 * Why this pattern?
 * - Single source of truth: change a string in one place, updates everywhere
 * - i18n-ready: when you add translation (e.g. react-i18next), replace this file
 *   with a `t('key')` call and zero component code changes are needed
 * - Scalable: as the project grows, organize into named sections (auth, tenant, errors...)
 */

export const MESSAGES = {
    // ─── Auth ─────────────────────────────────────────────────────────────────
    auth: {
        loginSuccess: "تم تسجيل الدخول بنجاح",
        loginFailed: "فشل تسجيل الدخول",
        logoutSuccess: "تم تسجيل الخروج بنجاح",
        noTokenReturned: "لم يتم إرجاع رمز المصادقة",
        unauthorized: "عذراً، هذا الحساب غير مصرح له بالدخول كمسؤول",
        sessionExpired: "انتهت الجلسة، يرجى تسجيل الدخول مجدداً",
        loggingIn: "جاري تسجيل الدخول...",
        loginButton: "تسجيل الدخول",
        logoutButton: "تسجيل الخروج",
        emailLabel: "الإيميل",
        passwordLabel: "كلمة المرور",
        forgotPassword: "نسيت كلمة المرور؟",
        welcome: "مرحباً،",
        guest: "زائر",
    },

    // ─── Tenant ───────────────────────────────────────────────────────────────
    tenant: {
        pageTitle: "إدارة المستأجرين",
        addButton: "إضافة مستأجر جديد",
        createButton: "إنشاء المستأجر",
        cancelButton: "إلغاء",
        modalTitle: "إضافة مستأجر جديد",
        creating: "جاري الإنشاء...",
        createSuccess: "تم إنشاء المستأجر بنجاح!",
        createFailed: "فشل في إنشاء المستأجر",
        createFailedRetry: "فشل في إنشاء المستأجر، حاول مرة أخرى",
        empty: "لا يوجد مستأجرين بعد. ابدأ بإضافة واحد جديد.",
        fetchError: "خطأ في جلب البيانات",
        unknown: "غير معروف",
        allFieldsRequired: "جميع الحقول مطلوبة (المعرف، الاسم، النطاق)",
        // Table columns
        colId: "المعرف (ID)",
        colName: "الاسم",
        colDomain: "النطاق (Domain)",
        // Form labels
        fieldId: "معرف المستأجر (ID)",
        fieldName: "اسم المستأجر",
        fieldDomain: "النطاق (Domain)",
        // Placeholders
        placeholderId: "مثال: company-slug",
        placeholderName: "مثال: شركة الأمل",
        placeholderDomain: "مثال: alamal.sa",
    },

    // ─── Server / HTTP Errors ─────────────────────────────────────────────────
    errors: {
        serverError: "حدث خطأ في الخادم. حاول مرة أخرى.",
        networkError: "تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.",
        unknownError: "حدث خطأ غير متوقع.",
    },

    // ─── Dashboard ────────────────────────────────────────────────────────────
    dashboard: {
        title: "لوحة التحكم",
        tenantsCount: "عدد المستأجرين:",
    },

    // ─── Sidebar ──────────────────────────────────────────────────────────────
    sidebar: {
        title: "لوحة التحكم",
        home: "الرئيسية",
        tenants: "المستأجرين",
        settings: "الإعدادات",
    },
} as const;

// Type helper so consumers get full autocomplete on keys
export type Messages = typeof MESSAGES;
