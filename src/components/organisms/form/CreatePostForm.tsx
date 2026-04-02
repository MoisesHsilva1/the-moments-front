import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { PostFormSchema, type PostInput } from "@/schemas/postSchema";
import InputImage from "@/components/molecules/InputImage";
import StarRating from "@/components/molecules/StarRating";
import { TagsInput } from "@/components/molecules/TagsInput";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { usePostCreate } from "@/hooks/usePosts";
import { Spinner } from "@/components/ui/spinner";

const inputBaseClass =
  "w-full rounded-2xl border-0 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E75E43]";

const CreatePostForm: React.FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: createPost, isPending: isCreatingPost } =
    usePostCreate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInput>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: null,
      body: null,
      imageUrl: null,
      stars: null,
      tags: [],
    },
  });

  const onSubmit = async (data: PostInput) => {
    try {
      await createPost({
        ...data,
        imageUrl:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
      });
      navigate("/posts");
    } catch (err: any) {
      console.error("Falha ao criar post", err);
    }
  };

  return (
    <Field>
      <FieldGroup>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
          noValidate
        >
          <Field className="flex flex-col gap-2">
            <FieldLabel className="text-sm font-medium text-zinc-400">
              Imagem de destaque
            </FieldLabel>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <InputImage
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.imageUrl?.message}
                />
              )}
            />
          </Field>

          <Field className="flex flex-col gap-2">
            <FieldLabel
              htmlFor="title"
              className="text-sm font-medium text-zinc-400"
            >
              Título
            </FieldLabel>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="title"
                  type="text"
                  placeholder="Digite o título do seu momento..."
                  className={`${inputBaseClass} ${errors.title ? "ring-2 ring-red-500" : ""}`}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors.title && (
              <FieldDescription className="text-sm text-red-500">
                {errors.title.message}
              </FieldDescription>
            )}
          </Field>

          <Field className="flex flex-col gap-2">
            <FieldLabel
              htmlFor="body"
              className="text-sm font-medium text-zinc-400"
            >
              Conteúdo
            </FieldLabel>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="body"
                  placeholder="O que você está pensando ou vivendo agora?"
                  className={`min-h-[120px] resize-none ${inputBaseClass} ${
                    errors.body ? "ring-2 ring-red-500" : ""
                  }`}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors.body && (
              <FieldDescription className="text-sm text-red-500">
                {errors.body.message}
              </FieldDescription>
            )}
          </Field>

          <Field className="flex flex-col gap-2">
            <FieldLabel className="text-sm font-medium text-zinc-400">
              Sua Avaliação
            </FieldLabel>
            <Controller
              name="stars"
              control={control}
              render={({ field }) => (
                <StarRating
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.stars?.message}
                />
              )}
            />
          </Field>

          <Field className="flex flex-col gap-2">
            <FieldLabel className="text-sm font-medium text-zinc-400">
              Tags
            </FieldLabel>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagsInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Pesquisar ou criar tags..."
                  error={errors.tags?.message}
                />
              )}
            />
            {errors.tags && (
              <FieldDescription className="text-sm text-red-500">
                {errors.tags.message}
              </FieldDescription>
            )}
            <FieldDescription className="text-xs text-zinc-500">
              Escolha categorias que descrevam melhor o seu momento.
            </FieldDescription>
          </Field>

          {errors.root?.message && (
            <div className="rounded-lg bg-red-500/10 p-4 text-center text-sm font-medium text-red-500">
              {errors.root.message}
            </div>
          )}

          <Field className="sticky bottom-6 mt-4 z-50">
            <Button
              type="submit"
              disabled={isCreatingPost}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-[#E75E43] py-6 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#E75E43]/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingPost ? (
                <>
                  <Spinner className="text-[#E75E43]" />
                </>
              ) : (
                "Publicar Momento"
              )}
            </Button>
          </Field>
        </form>
      </FieldGroup>
    </Field>
  );
};

export default CreatePostForm;
