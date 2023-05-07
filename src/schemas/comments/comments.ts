import {
  ICommentRequest,
  ICommentResponse,
} from "../../interfaces/comments/index";
import { SchemaOf } from "yup";
import * as yup from "yup";

export const commentsSchemaRequest: SchemaOf<ICommentRequest> = yup
  .object()
  .shape({
    comment: yup.string().required("Não pode enviar um comentário vazio"),
  });

export const commentsSchemaResponse: SchemaOf<ICommentResponse> = yup
  .object()
  .shape({
    id: yup.string(),
    comment: yup.string(),
    created_at: yup.date(),
    updated_at: yup.date(),
  })
  .clone() as SchemaOf<ICommentResponse>;
