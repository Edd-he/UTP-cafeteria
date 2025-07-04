/* eslint-disable no-unused-vars */
'use client'

import { useRef, ChangeEvent, DragEvent } from 'react'
import Image from 'next/image'
import { PiUploadSimpleThin } from 'react-icons/pi'

type Props = {
  onChange: (value: File | null) => void
  value?: File | null
  defaultImage?: string
}

export default function ImageUploader({
  onChange,
  value,
  defaultImage,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const MAX_SIZE_MB = 5

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = Array.from(e.target.files)[0]
      if (validateFile(file)) {
        onChange(file)
      }
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      const file = Array.from(e.dataTransfer.files)[0]
      if (validateFile(file)) {
        onChange(file)
      }
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`El archivo ${file.name} supera el límite de 1MB`)
      return false
    }
    return true
  }

  return (
    <div
      className="z-10 h-96 relative flex-center border rounded border-primary"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        ref={inputRef}
      />

      {value instanceof File ||
      (defaultImage && defaultImage !== 'PENDIENTE') ? (
        <div
          className="group relative size-75 flex-center cursor-pointer rounded m-auto duration-200 hover:bg-accent "
          onClick={handleClick}
        >
          <Image
            src={
              value instanceof File ? URL.createObjectURL(value) : defaultImage!
            }
            alt="Imagen"
            className="object-cover size-75 rounded"
            height={300}
            width={300}
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/30 w-full h-full flex-center opacity-0 group-hover:opacity-100 duration-200">
            <PiUploadSimpleThin
              size={40}
              className="group-hover:text-primary text-shadow-lg duration-200"
            />
          </div>
        </div>
      ) : (
        <div
          className="size-75 flex-center cursor-pointer rounded group m-auto duration-200 hover:bg-accent "
          onClick={handleClick}
        >
          <PiUploadSimpleThin
            size={40}
            className="group-hover:text-primary text-shadow-lg duration-200"
          />
        </div>
      )}
    </div>
  )
}
