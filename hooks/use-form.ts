import { useState } from 'react'

interface UseFormProps<T> {
  initialValues: T
}

export default function useForm<T extends Record<string, string>>({ initialValues }: UseFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<T>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))

    if (value === '' || !value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: `El ${name} es requerido` }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }))
    }
  }

  const resetForm = (newValues?: T) => {
    if (newValues) setFormData(newValues)
    else setFormData(initialValues)
    
    setErrors({})
    setSubmitError(null)
  }

  return {
    formData,
    errors,
    submitError,
    setSubmitError,
    setFormData,
    handleChange,
    resetForm
  }
}
