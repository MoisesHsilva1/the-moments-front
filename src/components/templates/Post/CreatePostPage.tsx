import React from "react";
import CreatePostForm from "@/components/organisms/form/CreatePostForm";
import {
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldDescription,
} from "@/components/ui/field";

const CreatePostPage: React.FC = () => {
  return (
    <FieldGroup className="flex min-h-screen w-full justify-center px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <FieldSet className="w-full max-w-2xl">
        <FieldLegend className="font-bold mb-2">Nova postagem</FieldLegend>
        <FieldDescription>
          Compartilhe sua experiência gastronômica, avalie e adicione tags.
        </FieldDescription>

        <CreatePostForm />
      </FieldSet>
    </FieldGroup>
  );
};

export default CreatePostPage;
